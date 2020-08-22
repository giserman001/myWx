const sleep = (delay) =>
  new Promise((reslove) => {
    setTimeout(() => {
      reslove();
    }, delay || 500);
  });

export const getMemberInfo = async () => {
  await sleep();
  return {
    id: 0,
    nick_name: "string",
    avatar: "string",
    user_role: "string",
    role_name: "string",
    share_code: "string",
    supremacy_id: 0,
    active_points: 0,
    max_points: 0,
    member: [
      {
        count: 0,
        menu_type: "string",
        menu_name: "string",
        can_click: 0,
      },
    ],
    upgrade_tip: "string",
    profit: [
      {
        amount: 0,
        menu_type: "string",
        menu_name: "string",
        can_click: 0,
      },
    ],
    order: [
      {
        count: 0,
        menu_type: "string",
        menu_name: "string",
        can_click: 0,
      },
    ],
  };
};

export const getActivePoint = async () => {
  await sleep();
  return {
    status: 0,
    msg: "string",
    data: {
      active_points: 0,
      my_points: 0,
      sub_points: 0,
      update_tip: "string",
      rule_tip: "string",
    },
  };
};

export const accessToken =
  "$2y$13$a6IDtHZdLrmPadsq4dFdaOHkN0Inf6iJ0tLTjJooyFCaPHgFzsDOW";
