export const initialState = {
    isAuthenticated: false,
    user: {
        fname: "",
        uname: "",
        contactno: "",
        email: "",
        role: "",
    },
}

export const actions = {
    SET_AUTH: "SET_AUTH",
    SET_USER: "SET_USER",
}

const reducer = (state, action) =>
{
    console.log(action);

    switch (action.type)
    {
        case actions.SET_AUTH:
            return {
                ...state,
                isAuthenticated: action.auth
            }
        case actions.SET_USER:
            return {
                ...state,
                user: action.user
            };

        default:
            return state;

    }
}

export default reducer;