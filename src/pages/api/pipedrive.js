const data = {
  current_week: 3,
  data: [
    {
      name: "Donati Victoire",
      pipedrive_id: 11603574,
      deal: {
        value: {
          week: 4,
          month: 18,
        },
        goal: {
          week: 4,
          month: 16,
        },
      },
      deal_won: {
        value: {
          week: 0,
          month: 0,
        },
        goal: {
          week: 0,
          month: 2,
        },
      },
      ca: {
        value: {
          year: 0,
        },
        goal: {
          year: 400000,
        },
      },
      call: {
        value: {
          week: 0,
          month: 8,
        },
        goal: {
          week: 12,
          month: 48,
        },
      },
      visit: {
        value: {
          week: 0,
          month: 1,
        },
        goal: {
          week: 1,
          month: 4,
        },
      },
      proposal_sent: {
        value: {
          week: 11,
          month: 67,
        },
        goal: {
          week: 12,
          month: 48,
        },
      },
      percentage_completed: 32,
    },
    {
      name: "Fatinia",
      pipedrive_id: 11603572,
      deal: {
        value: {
          week: 4,
          month: 18,
        },
        goal: {
          week: 4,
          month: 16,
        },
      },
      deal_won: {
        value: {
          week: 0,
          month: 0,
        },
        goal: {
          week: 0,
          month: 2,
        },
      },
      ca: {
        value: {
          year: 0,
        },
        goal: {
          year: 400000,
        },
      },
      call: {
        value: {
          week: 0,
          month: 8,
        },
        goal: {
          week: 12,
          month: 48,
        },
      },
      visit: {
        value: {
          week: 0,
          month: 1,
        },
        goal: {
          week: 1,
          month: 4,
        },
      },
      proposal_sent: {
        value: {
          week: 11,
          month: 67,
        },
        goal: {
          week: 12,
          month: 48,
        },
      },
      percentage_completed: 30,
    },
  ],
};

export default function handler(_, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache");
  res.end(JSON.stringify(data));
}
