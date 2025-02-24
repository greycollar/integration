import { account } from "../account";
import { getColleagues } from "../api/getColleagues";
import storage from "../Storage";

const colleagueSelect = async ({ body, ack, client }) => {
  await ack();

  const actionId = body.actions[0].action_id;
  
  const isLearnFlow = actionId === "learn_colleague_select";
  
  await storage.set("selectedTeamId", body.actions[0].selected_option.value);

  const { user } = body.message;

  const session = account(user);

  try {
    const colleagues = await getColleagues(session);

    const blocks = [
      {
        type: "actions",
        elements: [
          {
            type: "static_select",
            action_id: isLearnFlow ? "select_learn_type" : "create_task",
            placeholder: {
              type: "plain_text",
              text: "Select a colleague",
            },
            options: colleagues.map((colleague) => ({
              text: {
                type: "plain_text",
                text: colleague.name,
              },
              value: colleague.id,
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
    console.error("Error handling colleague select action:", error);
  }
};

export { colleagueSelect };

