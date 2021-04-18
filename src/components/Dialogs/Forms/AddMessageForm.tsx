import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { TextArea } from "../../Common/FormsControls/FormsControls";

const maxLen = maxLengthCreator(30)

const AddMessageForm = (props: any) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
      validate={[required,maxLen]}
        placeholder="Enter your message"
        name={"addMessage"}
        component={TextArea}
      />
      <button>Add message</button>
    </form>
  );
};

export const AddMessageFormRedux = reduxForm({ form: "addMessage" })(
  AddMessageForm
);