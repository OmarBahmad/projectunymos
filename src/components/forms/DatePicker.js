import React from 'react';
import { View, TextInput, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { stylesForms } from '../../styles/GlobalStyles';

const DatePicker = ({ birthDate, setBirthDate, openModal, setOpenModal }) => {
  return (
    <View style={[stylesForms.formCol, stylesForms.shortInput]}>
      <Text style={stylesForms.label}>Data de Nascimento</Text>
      <TextInput
        style={stylesForms.input}
        value={birthDate ? moment(birthDate).format("DD/MM/YYYY") : ''}
        placeholder="Data de Nascimento"
        onFocus={() => {
          setBirthDate(new Date());
          setOpenModal(true);
        }}
        showSoftInputOnFocus={false}
      />
      {openModal && (
        <DateTimePicker
          testID="dateTimePicker"
          value={birthDate}
          mode="date"
          onChange={(event, selectedDate) => {
            setOpenModal(false);
            if (event?.type === 'dismissed') {
              setBirthDate(birthDate);
              return;
            }
            setBirthDate(selectedDate);
          }}
        />
      )}
    </View>
  );
};

export default DatePicker;
