import { observer } from "mobx-react";
import UserData from "./UserData";
import History from "./History";
function Aside() {
  return (
    <aside className="sidebar sidebar--history">
      <History />
      <UserData />
    </aside>
  );
}

export default observer(Aside);
