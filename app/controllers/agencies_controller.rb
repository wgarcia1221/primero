class AgenciesController < ApplicationController

  @model_class = Agency

  include MediaActions

  before_filter :filter_params_array_duplicates, :only => [:create, :update]
  before_filter :load_record_or_redirect, :only => [ :show, :edit, :destroy, :update ]
  before_filter :load_agencies_according_to_filter, :only => [:index]

  def index
    authorize! :index, Agency
    @page_name = t("agencies.label")
    # @agencies = Agency.by_order
  end

  def show
    authorize! :view, @agency

    respond_to do |format|
      format.html
    end
  end

  def new
    authorize! :create, Agency
    @agency = Agency.new
  end

  def create
    authorize! :create, Agency
    @agency = Agency.new(params[:agency])

    if @agency.save
      redirect_to agencies_path, notice: t("agencies.successfully_created")
    else
      render :new
    end
  end

  def edit
    authorize! :update, Agency
  end

  def update
    authorize! :update, Agency

    @agency.update_attributes(params[:agency])

    if @agency.save
      redirect_to agencies_path, notice: t("agencies.successfully_updated")
    else
      flash[:error] = t("agencies.error_in_updating")
      render :action => "edit"
    end
  end

  def destroy
    authorize! :destroy, Agency
    @agency.destroy
    redirect_to agencies_path
  end

  def update_order
    agencies = Agency.all.all

    params['user-row-agency-row'].each_with_index do |id, index|
      agency = agencies.select{ |a| a.name == id }.first
      agency.update_attributes(order: index + 1)
    end

    render :json => ""
  end

  private

  def load_record_or_redirect
    @agency = Agency.get(params[:id]) if params[:id]
  end

  # TODO - DRY this up... very similar to code in locations_controller
  def load_agencies_according_to_filter
    filter_option = params[:filter] || "enabled"

    case filter_option
      when "all"
        @agencies = Agency.all.all
      when "disabled"
        @agencies = Agency.by_disabled.all
      else
        @agencies = Agency.by_enabled.all
    end
  end
end