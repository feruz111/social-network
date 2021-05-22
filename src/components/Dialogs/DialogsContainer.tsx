import {
  addMessageActionCreator,
  MessagesPageType,
} from "../../redux/dialogs-reducer";
import Dialogs, { DialogsPageType } from "./Dialogs";
import { connect } from "react-redux";
import { AppActionsType, RootStoreType } from "../../redux/store";
import { compose, Dispatch } from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";

type mstpType = {
  newPostText: string;
  messagesPage: MessagesPageType;
};
type mdtpType = {
  addMessage: (text: string) => void;
};

let mapStateToProps = (state: RootStoreType): mstpType => {
  return {
    newPostText: state.messagesPage.newPostText,
    messagesPage: state.messagesPage,
  };
};

let mapDispatchToProps = (dispatch: Dispatch<AppActionsType>): mdtpType => {
  return {
    addMessage: (text: string) => {
      dispatch(addMessageActionCreator(text));
    },
  };
};

export const DialogsContainer: any = compose(
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);
