export const HANDLE_EXPERIENCE_SUCCESS = "POST_EXPERIENCE_SUCCESS";
export const HANDLE_EXPERIENCE_LOADING = "HANDLE_EXPERIENCE_LOADING";
export const HANDLE_EXPERIENCE_ERROR = "HANDLE_EXPERIENCE_ERROR";

// userId mandatory

// if experienceId =
// "" then returns list of profiles to 'experiences'
// an experience ID as string then returns object of specific experience to 'profile'

export const handleExperiences = (type, userId, experienceId, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: HANDLE_EXPERIENCE_LOADING,
        payload: true,
      });
      let fetchURL =
        "https://striveschool-api.herokuapp.com/api/profile/" +
        userId +
        "experiences/";

      if (type !== "POST") {
        fetchURL = fetchURL + experienceId;
      }

      const postPutConfig = {
        method: type,
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };

      const deleteConfig = {
        method: "DELETE",
      };

      const chosenConfig = type === "DELETE" ? deleteConfig : postPutConfig;

      let response = await fetch(fetchURL, chosenConfig);

      if (response.ok) {
        let experiences = await response.json();

        dispatch({
          type: HANDLE_EXPERIENCE_SUCCESS,
          payload: true,
        });
      } else {
        console.log("error with initial fetch");
        dispatch({
          type: HANDLE_EXPERIENCE_ERROR,
        });
      }
    } catch (error) {
      console.log("try catch error:", error);
      dispatch({
        type: HANDLE_EXPERIENCE_ERROR,
      });
    } finally {
      dispatch({
        type: HANDLE_EXPERIENCE_LOADING,
        payload: false,
      });
    }
  };
};
