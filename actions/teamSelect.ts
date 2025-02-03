import { account } from "../account";
import { getTeams } from "../api/getTeams";

const teamSelect = async ({ body, ack, client, say }) => {
  await ack();

  const actionId = body.actions[0].action_id;
  
  const isLearnFlow = actionId === "learn_team_select";
  
  const { user } = body.message;

  const session = account(user);

  try {
    const teams = await getTeams(session);
    
    console.log("Teams:", teams);

    const blocks = [
      {
        type: "actions",
        elements: [
          {
            type: "static_select",
            action_id: isLearnFlow ? "learn_colleague_select" : "task_colleague_select",
            placeholder: {
              type: "plain_text",
              text: "Select a Team",
            },
            options: teams.map((team) => ({
              text: {
                type: "plain_text",
                text: team.name,
              },
              value: team.id,
            })),
          },
        ],
      },
    ];

    await client.chat.update({
      channel: body.channel.id,
      ts: body.message.ts,
      metadata: {},
      attachments: [
        {
          color: "#3366cc",
          blocks: blocks,
        },
      ],
    });
  } catch (error) {
    console.error("Error handling team select action:", error);
  }
};
export { teamSelect };

