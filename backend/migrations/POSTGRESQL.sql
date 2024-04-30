SELECT 
    User.user_id,
    User.password,
    financial_goals.goal_id,
    financial_goals.description,
    financial_goals.target_amount,
    financial_goals.current_amount,
    financial_goals.target_date
FROM 
    User
JOIN 
    financial_goals ON User.user_id = financial_goals.user_id;
