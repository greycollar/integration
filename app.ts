import { App } from "@slack/bolt";
import { colleagueSelect } from "./actions/colleagueSelect";
import { createTask } from "./actions/createTask";
import { handleLearnType } from "./actions/handleLearnType";
import { learn } from "./commands/learn";
import { listen } from "./commands/listen";
import { listenNotifications } from "./actions/listenNotifications";
import { selectLearnType } from "./actions/selectLearnType";
import { sendTask } from "./actions/sendTask";
import { submitLearnInfo } from "./actions/submitLearnInfo";
import { task } from "./commands/task";
import { teamSelect } from "./actions/teamSelect";

const createApp = () => {
  const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
  });

  app.command("/listen", listen);
  app.action("listen_team_select", teamSelect);
  app.action("listen_notifications", listenNotifications);

  app.command("/learn", learn);
  app.action("learn_team_select", teamSelect);
  app.action("learn_colleague_select", colleagueSelect);
  app.action("select_learn_type", selectLearnType);
  app.action(/^learn_type_/, handleLearnType);
  app.action("submit_learn_info", submitLearnInfo);

  app.command("/task", task);
  app.action("task_team_select", teamSelect);
  app.action("task_colleague_select", colleagueSelect);
  app.action("create_task", createTask);
  app.action("send_task", sendTask);

  return app;
};

export { createApp };
