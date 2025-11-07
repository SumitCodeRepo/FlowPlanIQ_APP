import { useEffect, useState } from "react";
import { UsersIcon, Search, UserPlus, Shield, Activity } from "lucide-react";
import { useSelector } from "react-redux";
import InviteMemberDialog from "../components/InviteMemberDialog";
import { Gantt as GtControl} from "@svar-ui/react-gantt";
import SVARThemeWrapper from '../features/SVARThemeWrapper'
import "@svar-ui/react-gantt/all.css";

const Gantt = () => {

   


    const tasks = [
        {
          id: 20,
          text: "New Task",
          start: new Date(2024, 5, 11),
          end: new Date(2024, 6, 12),
          duration: 1,
          progress: 2,
          type: "task",
          lazy: false,
        },
        {
          id: 47,
          text: "[1] Master project",
          start: new Date(2024, 5, 12),
          end: new Date(2024, 7, 12),
          duration: 8,
          progress: 0,
          parent: 0,
          type: "summary",
        },
        {
          id: 22,
          text: "Task",
          start: new Date(2024, 7, 11),
          end: new Date(2024, 8, 12),
          duration: 8,
          progress: 0,
          parent: 47,
          type: "task",
        },
        {
          id: 21,
          text: "New Task 2",
          start: new Date(2024, 7, 10),
          end: new Date(2024, 8, 12),
          duration: 3,
          progress: 0,
          type: "task",
          lazy: false,
        },
      ];
      
      const links = [{ id: 1, source: 20, target: 21, type: "e2e" }];
      
      const scales = [
        { unit: "month", step: 1, format: "MMMM yyy" },
        { unit: "day", step: 1, format: "d" },
      ];
      
      const isDark = useSelector(selectIsDarkTheme);
    return (
        <div className="space-y-6 max-w-6xl mx-auto">

    <SVARThemeWrapper>
    <GtControl tasks={tasks} links={links} scales={scales} />
  </SVARThemeWrapper>


          
            
        </div>
    );
};

export default Gantt;