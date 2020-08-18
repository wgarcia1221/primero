import { fromJS } from "immutable";

import { setupMockFormComponent } from "../../../../../../test";
import { FormSectionField, SUBFORM_SECTION, SELECT_FIELD, TEXT_FIELD, TICK_FIELD } from "../../../../../form";

import { TranslatableOptions } from "./components";
import FieldTranslationsDialog from "./component";
import { NAME } from "./constants";

describe("<FieldTranslationsDialog />", () => {
  const initialState = fromJS({
    ui: { dialogs: { [NAME]: true } },
    application: { locales: ["en", "fr", "ar"] }
  });

  it("should render <FieldTranslationsDialog />", () => {
    const { component } = setupMockFormComponent(
      FieldTranslationsDialog,
      {
        field: fromJS({
          name: "field_1",
          type: TEXT_FIELD,
          display_name: { en: "Field 1" }
        }),
        currentValues: {},
        mode: "edit"
      },
      {},
      initialState
    );

    expect(component.find(FieldTranslationsDialog)).to.have.lengthOf(1);
  });

  it("should render translation fields for TEXT_FIELD", () => {
    const { component } = setupMockFormComponent(
      FieldTranslationsDialog,
      {
        field: fromJS({
          name: "field_1",
          type: TEXT_FIELD,
          display_name: { en: "Field 1" }
        }),
        currentValues: {},
        mode: "edit"
      },
      {},
      initialState
    );

    const expectedFieldNames = [
      "locale_id",
      "field_1.display_name.fr",
      "field_1.display_name.ar",
      "field_1.help_text.fr",
      "field_1.help_text.ar",
      "field_1.guiding_questions.fr",
      "field_1.guiding_questions.ar"
    ];

    const fieldNames = component
      .find(FieldTranslationsDialog)
      .find(FormSectionField)
      .map(field => field.props().field.name);

    expect(component.find(FieldTranslationsDialog).find(FormSectionField)).to.have.lengthOf(7);
    expect(fieldNames).to.deep.equal(expectedFieldNames);
  });

  it("should render translation fields for SUBFORM_SECTION", () => {
    const { component } = setupMockFormComponent(
      FieldTranslationsDialog,
      {
        field: fromJS({
          name: "field_1",
          type: SUBFORM_SECTION,
          display_name: { en: "Field 1" }
        }),
        subform: fromJS({
          name: { en: "Subform 1" }
        }),
        currentValues: {},
        mode: "edit"
      },
      {},
      initialState
    );

    const expectedFieldNames = [
      "locale_id",
      "subform_section.name.fr",
      "subform_section.name.ar",
      "subform_section.description.fr",
      "subform_section.description.ar",
      "field_1.help_text.fr",
      "field_1.help_text.ar",
      "field_1.guiding_questions.fr",
      "field_1.guiding_questions.ar"
    ];

    const fieldNames = component
      .find(FieldTranslationsDialog)
      .find(FormSectionField)
      .map(field => field.props().field.name);

    expect(component.find(FieldTranslationsDialog).find(FormSectionField)).to.have.lengthOf(9);
    expect(fieldNames).to.deep.equal(expectedFieldNames);
  });

  it("should render translation fields for TICK_FIELD", () => {
    const { component } = setupMockFormComponent(
      FieldTranslationsDialog,
      {
        field: fromJS({
          name: "field_1",
          type: TICK_FIELD
        }),
        currentValues: {},
        mode: "edit"
      },
      {},
      initialState
    );

    const expectedFieldNames = [
      "locale_id",
      "field_1.display_name.fr",
      "field_1.display_name.ar",
      "field_1.help_text.fr",
      "field_1.help_text.ar",
      "field_1.guiding_questions.fr",
      "field_1.guiding_questions.ar",
      "field_1.tick_box_label.fr",
      "field_1.tick_box_label.ar"
    ];

    const fieldNames = component
      .find(FieldTranslationsDialog)
      .find(FormSectionField)
      .map(field => field.props().field.name);

    expect(component.find(FieldTranslationsDialog).find(FormSectionField)).to.have.lengthOf(9);
    expect(fieldNames).to.deep.equal(expectedFieldNames);
  });

  it("should render translation fields for SELECT_FIELD with manual options", () => {
    const { component } = setupMockFormComponent(
      FieldTranslationsDialog,
      {
        field: fromJS({
          name: "field_1",
          type: SELECT_FIELD,
          option_strings_text: {
            en: [{ id: "option_1", display_text: "Option 1" }],
            es: [{ id: "option_1", display_text: "Opción 1" }]
          }
        }),
        currentValues: {},
        mode: "edit"
      },
      {},
      initialState
    );

    const expectedFieldNames = [
      "locale_id",
      "field_1.display_name.fr",
      "field_1.display_name.ar",
      "field_1.help_text.fr",
      "field_1.help_text.ar",
      "field_1.guiding_questions.fr",
      "field_1.guiding_questions.ar",
      "field_1.option_strings_text.en[0].id",
      "field_1.option_strings_text.en[0].display_text",
      "field_1.option_strings_text.fr[0].id",
      "field_1.option_strings_text.fr[0].display_text",
      "field_1.option_strings_text.ar[0].id",
      "field_1.option_strings_text.ar[0].display_text"
    ];

    const fieldNames = component
      .find(FieldTranslationsDialog)
      .find(FormSectionField)
      .map(field => field.props().field.name);

    expect(component.find(FieldTranslationsDialog).find(FormSectionField)).to.have.lengthOf(13);
    expect(fieldNames).to.deep.equal(expectedFieldNames);
    expect(component.find(TranslatableOptions)).to.have.lengthOf(1);
  });
});