export function registryOfficesReducer(state, action) {
    switch (action.type) {
      case "ADD_REGISTRY_OFFICE":
        return { ...state, registryOffices: [...state.registryOffices, action.payload] };
      case "SET_REGISTRY_OFFICE":
        return { ...state, registryOffices: action.payload};
      default:
        return state;
    }
}