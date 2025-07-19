import { defineStore } from "pinia";

interface recordMarkType {
  text: string;
}

interface recordType {
  value: string;
  title: string;
}

interface formRecordType {
  id: number;
  marks: recordMarkType[];
  type: string;
  login: string;
  password: string | null;
}
export { formRecordType }

interface formInputIncorrectType {
  [slug: string]: boolean;
}

export const formStore = defineStore("form", {
  state: () => {
    return {
      formRecords: [
        {id: 1, marks: [{text: "XXX"}], type: "local", login: "Значение", password: "123456"},
        {id: 2, marks: [{text: "XXX"}, {text: "YYYYYYYYYY"}, {text: "IIIIIIIIII"}, {text: "MMMMMMMMM"}], type: "local", login: "Значение", password: "123456"},
        {id: 3, marks: [{text: "XXX"}], type: "local", login: "Значение", password: "123456"},
        {id: 4, marks: [{text: "Значение"}], type: "ldap", login: "Значение", password: null},
        {id: 5, marks: [{text: "Значение"}], type: "ldap", login: "Значение", password: null}
      ] as formRecordType[],
      recordTypes: [
        {value: 'local', title: 'Локальная'},
        {value: 'ldap', title: 'LDAP'}
      ] as recordType[],
      maxMarksLength: 50 as number,
      maxLoginLength: 100 as number,
      maxPasswordLength: 100 as number,
      isFormInputIncorrect: {} as formInputIncorrectType
    }
  },
  actions: {
    transformMarksToString(marks: recordMarkType[]): string {
      let string: string = "";
      for(let markId in marks){
        if(markId != "0"){
          string += " ";
        }
        string += marks[markId].text + ";";
      }

      return string
    },
    transformStringToMarks(marksString: string): recordMarkType[] {
      let marks: string[] | recordMarkType[] = marksString.trim().split(";");
      marks = marks.filter(string => string.trim() != "");
      marks = marks.map(mark => {
        return {text: mark.trim()}
      });
      return marks
    },
    changeFormRecords(): undefined {
      let newFormRecords: formRecordType[] = [...this.formRecords];
      newFormRecords = newFormRecords.map(record => {
        if(record.type == "ldap" && record.password != null){
          record.password = null;
        }
        if(record.type != "ldap" && record.password == null){
          record.password = "";
        }
        return record
      });
      this.formRecords = newFormRecords;
    },
    filterFormRecords(): formRecordType[] {
      const newFormRecords = this.formRecords.filter(record => {
        if(record.marks.length == 0 || record.marks.length <= this.maxMarksLength || this.isFormInputIncorrect[record.id + "-" + "marks"] == false){
          if((record.login.trim() != "" && record.login.trim().length <= this.maxLoginLength) || this.isFormInputIncorrect[record.id + "-" + "login"] == false){
            if(record.type == "ldap" || (record.password && record.password.trim() != "" && record.password.trim().length <= this.maxPasswordLength) || this.isFormInputIncorrect[record.id + "-" + "password"] == false){
              return true
            }
          }
        }
        return false
      });
      return newFormRecords
    },
    changeInputValue(prop: string, record: formRecordType, event: any){
      const slug: string = record.id + "-" + prop;
      const string: string = event.target?.value.trim();
      if(prop == "marks"){
        if(string.length <= this.maxMarksLength){
          this.isFormInputIncorrect[slug] = false;
          record[prop] = this.transformStringToMarks(string);
        } else {
          this.isFormInputIncorrect[slug] = true;
        }
      }
      if(prop == "type"){
        record[prop] = event;
      }
      if(prop == "login"){
        if(string != "" && string.length <= this.maxLoginLength){
          this.isFormInputIncorrect[slug] = false;
          record[prop] = string;
        } else {
          this.isFormInputIncorrect[slug] = true;
        }
      }
      if(prop == "password"){
        if(string != "" && string.length <= this.maxPasswordLength){
          this.isFormInputIncorrect[slug] = false;
          record[prop] = string;
        } else {
          this.isFormInputIncorrect[slug] = true;
        }
      }
      this.changeFormRecords();
      this.writeFormRecordsToLocalStorage();
    },
    removeRecordById(id: number){
      this.formRecords = this.formRecords.filter(record => record.id != id);
      this.writeFormRecordsToLocalStorage();
    },
    addNewRecord(){
      const newRecord: formRecordType = {
        id: Date.now(),
        marks: [],
        type: "local",
        login: "",
        password: ""
      };
      this.formRecords.push(newRecord);
      this.writeFormRecordsToLocalStorage();
    },
    writeFormRecordsToLocalStorage(){
      const newFormRecords: formRecordType[] = this.filterFormRecords();
      localStorage.setItem("formRecords", JSON.stringify(newFormRecords));
    },
    async readFormRecordsFromLocalStorage(){
      const LSItem = localStorage.getItem("formRecords");
      if(LSItem){
        this.formRecords = await JSON.parse(LSItem);
      }
    }
  }
})