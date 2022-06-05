export interface HandleAlert {
  text: string;
  status: string;
  alertOn: any;
  alertOff: any;
  dispatch: any;
}


const handleAlert = ({ text, status, alertOn, alertOff, dispatch }: HandleAlert) => {
  const alertState = { text: text, status: status };
  dispatch(alertOn(alertState));
  setTimeout(() => {
    console.log("do i happen???");
    dispatch(alertOff());
  }, 1000);

};

export default handleAlert;
