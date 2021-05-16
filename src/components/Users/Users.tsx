import React from "react";
import { UsersType } from "../../redux/users-reducer";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";

type UsersContainerPropsType = {
  users: Array<UsersType>;
  pageSize: number;
  currentPage: number;
  totalUsersCount: number;
  followingInProgress: any;
  isAuth: boolean;
  follow: (id: number) => void;
  unFollow: (id: number) => void;
  onPageChanged: (pageNumber: number) => void;
  followingInProgressAC: (isFetching: boolean, userId: number) => void;
};

const Users = ({
  totalUsersCount,
  pageSize,
  currentPage,
  isAuth,
  users,
  onPageChanged,
  ...props
}: UsersContainerPropsType) => {
  return (
    <div>
      <Paginator
        pageSize={pageSize}
        currentPage={currentPage}
        totalUsersCount={totalUsersCount}
        onPageChanged={onPageChanged}
        isAuth={isAuth}
      />
      {users.map((u: UsersType) => {
        return (
          <User
            key={u.id}
            user={u}
            followingInProgress={props.followingInProgress}
            follow={props.follow}
            unFollow={props.unFollow}
          />
        );
      })}
    </div>
  );
};

export default Users;
