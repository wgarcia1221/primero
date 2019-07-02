module Api::V2
  class FormSectionsController < ApplicationApiController
    @model_class = FormSection
    
    before_action :permitted_forms, only: [:index, :show, :update, :destroy]

    def index
      authorize! :index, model_class
      params.permit!
    end
    
    def show
      authorize! :read, model_class
      @form_section = model_class.find(params[:id])
      authorize! :read, @form_section
      check_permitted_form(@form_section)
    end
    
    def create
      authorize! :create, model_class
      params.permit!
      @form_section = model_class.new(form_section_localized_params)
      @form_section.fields = fields_localized_params.map{ |f| Field.new(f) }
      @form_section.primero_modules = primero_modules
      @form_section.save!
      status = params[:data][:id].present? ? 204 : 200
      render 'api/v2/form_sections/create', status: status
    end
    
    def update
      authorize! :update, model_class
      @form_section = model_class.find(params[:id])
      authorize! :update, @form_section
      check_permitted_form(@form_section)
      params.permit!

      @form_section.assign_attributes(form_section_localized_params)

      @form_section.primero_modules = primero_modules if form_section_params.key?('module_ids')

      if form_section_params.key?('fields')
        if fields_localized_params.present?
          @form_section.create_or_update_fields(fields_localized_params)
        else
          # TODO: If the request specifies an empty fields property, should we delete those fields?
          @form_section.fields = []
        end
      end

      @form_section.save!
    end

    def destroy
      # TODO: Check references in roles and modules.
      authorize! :enable_disable_record, model_class
      @form_section = model_class.find(params[:id])
      check_permitted_form(@form_section)
      @form_section.permitted_destroy!
    end

    def form_section_params
      DestringifyService.destringify(params['data'].try(:to_h) || {})
    end
    
    def form_section_localized_params
      localized_form_params = LocalizedFieldService.to_localized_fields(FormSection, form_section_params)
      localized_form_params.reject{ |k,_|  ['fields', 'module_ids'].include?(k) }
    end
    
    def fields_localized_params
      return [] if form_section_params['fields'].blank?
      form_section_params['fields'].map do |field_param| 
        LocalizedFieldService.to_localized_fields(Field, field_param)
      end
    end
  
    def primero_modules
      return [] if form_section_params['module_ids'].blank?
      PrimeroModule.where(unique_id: form_section_params['module_ids'])
    end
    
    def permitted_forms
      primero_module = PrimeroModule.find_by(unique_id: params[:module_id]) if params[:module_id].present? 
      @permitted_forms = current_user.permitted_forms(primero_module, params[:record_type])
    end

    def check_permitted_form(form_section)
      if (form_section.is_nested? && !form_section.nested_in?(@permitted_forms)) ||
         (!form_section.is_nested? && !@permitted_forms.include?(form_section))
        raise CanCan::AccessDenied.new
      end
    end
    
  end
end
