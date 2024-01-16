import { StyleSheet } from 'react-native';

export const pickerSelectStylesForms = StyleSheet.create({
  inputAndroid: {
    minWidth: "48%",
    minHeight: 50,
    backgroundColor: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    color: "#000",
    paddingRight: 30,
  },
  inputIOS: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
});

export const pickerSelectStylesHome = StyleSheet.create({
  inputAndroid: {
    minWidth: "48%",
    minHeight: 50,
    backgroundColor: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    color: "#000",
    paddingRight: 30,
  },
  inputIOS: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
});

export const stylesForms = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#ecf0f1",
    flexDirection: "column",
  },
  formRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
    gap: 10,
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#3498db",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    minHeight: 53,
    textAlign: "justify",
  },
  shortInput: {
    width: "48%",
  },
  longInput: {
    width: "100%",
    marginBottom: 10,
  },
  pickerContainer: {
    borderColor: "#3498db",
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
  },
  pickerSelectInput: {
    backgroundColor: "#fff",
    borderColor: "#3498db",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  seachButtonContainer: {
    width: "98%",
    justifyContent: "flex-end",
    paddingBottom: 3,
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16
  },
  button: {
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  submitButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 20
  },
});

export const stylesHome = StyleSheet.create({
  containerHome: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#42a5f5",
    width: "100%",
    padding: 16,
  },
  contentMargin: {
    paddingHorizontal: 16,
  },
  filterContainer: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  filterPicker: {
    fontSize: 16,
    marginTop: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 15,
    color: "#000",
    width: "100%",
    margin: "auto",
  },
  searchButton: {
    padding: 10,
    backgroundColor: "#c9c9ce",
    marginTop: 10,
  },
  searchButtonContainer: {
    paddingVertical: 5,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#8e8e93",
    marginLeft: 5,
    fontSize: 18,
    fontWeight: "600",
  },
  tableRowContainer: {
    flexDirection: "column",
    marginVertical: 25,
    gap: 40,
    maxHeight: "51%",
  },
  tableRowContent: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 42,
  },
  tableRowIcon: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  tableRowData: {
    width: "80%",
  },
  tableRowDataName: {
    textTransform: "uppercase",
    marginBottom: 10,
    fontSize: 18,
    color: "#414141",
    fontWeight: "600",
  },
  tableRowDataDoc: {
    textTransform: "uppercase",
    marginBottom: 5,
    fontSize: 16,
    color: "#868686",
  },
  tableRowDataCity: {
    textTransform: "uppercase",
    fontSize: 16,
    color: "#868686",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 10,
    justifyContent: "space-between",
  },
  newProposalButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#42a5f5",
    padding: 10,
    borderRadius: 5,
  },
  reportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#72bb53",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 18,
    fontWeight: "600",
  },
});