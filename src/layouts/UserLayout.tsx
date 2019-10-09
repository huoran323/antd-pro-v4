import React from 'react';
import {ConnectProps} from "@/models/connect";

export interface UserLayoutProps extends ConnectProps {

}

const UserLayout: React.FunctionComponent<ConnectProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  return (
    <div>
      {children}
    </div>
  )
}

export default  UserLayout;

