import React, {useState,useEffect, useRef}from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Switch,
    Alert,
} from 'react-native';
import Button1 from '../components/button1';
import axios from "../api/axios";
import requests from "../api/requests";
import SelectDropdown from 'react-native-select-dropdown';

const SignUp = (navigation : any, route : any) => {
  // 회원가입 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [region, setRegion] = useState('');
  const [group, setGroup] = useState('');

  // 유효성검사
  const [isId, setIsId] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordCeck, setIsPasswordCeck] = useState<boolean>(false);

  // 지역
  const [selected, setSelected] = useState(undefined);
  const data = [
    { label: '서울', value: 100 },
        { label: '대전', value: 200 },
        { label: '구미', value: 300 },
        { label: '부산', value: 400 },
        { label: '광주', value: 500 },
  ];

  // 회원 등록 버튼 onPress
  const signUpbutton = () => {
    axios.post(requests.register,{
      username : username,
      password : password,
      nickname : nickname,
      region_id : region,
      class_group : group,
    }, {
      headers : {"Content-type": `application/json`}
    })
    .then((response) => {
      console.log('회원가입성공');
      Alert.alert(                    // 말그대로 Alert를 띄운다
      "회원 등록 완료",                    // 첫번째 text: 타이틀 제목
      nickname+"님 감사합니다.",                         // 두번째 text: 그 밑에 작은 제목
      [                              // 버튼 배열
        {
          text: "확인",                              // 버튼 제목
          onPress: () => console.log("확인"),     //onPress 이벤트시 콘솔창에 로그를 찍는다
        }
      ],
      { cancelable: false })
      route.params.condition = true;
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <View style={styles.container3}>
      <TextInput style={styles.input} placeholder='아이디' onChangeText={(text) => setUsername(text)} returnKeyType="next" ></TextInput>
      <TextInput style={styles.input} placeholder='비밀번호' onChangeText={(text) => setPassword(text)} returnKeyType="next" ></TextInput>
      <TextInput style={styles.input} placeholder='비밀번호 확인' onChangeText={(text) => setPasswordCheck(text)} returnKeyType="next"></TextInput>
      <TextInput style={styles.input} placeholder='이름' onChangeText={(text) => setNickname(text)} returnKeyType="next" ></TextInput>

      {/* <TextInput style={styles.input} placeholder='지역'></TextInput> */}
      <View style={[{flexDirection:'row'}]}>
      <SelectDropdown
              data={data}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setRegion(selectedItem.value);
              }}
              defaultButtonText={'지역선택'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.label;
              }}
              rowTextForSelection={(item, index) => {
                return item.label;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
      />
      <View style={styles.divider} />
      <TextInput style={[styles.input, {width:100}]} placeholder='반' onChangeText={(text) => setGroup(text)} onSubmitEditing={signUpbutton}></TextInput>
      </View>
      <Button1 text={'회원 등록'} onPress={signUpbutton} disabled={!(isId && isPassword && isPasswordCeck)}></Button1>
    </View>
  )
};

const styles = StyleSheet.create({
  container3: {
    flex:1,
    margin: 10,
    alignItems: 'center',
  },
  input: {
    width: 219,
    height: 37,
    borderBottomColor: "#63B3ED",
    borderBottomWidth: 1,
  },
  dropdownsRow: {flexDirection: 'row', width: '20%', paddingHorizontal: '5%'},

  dropdown1BtnStyle: {
    flex: 1,
    height: 30,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderBottomColor: '#63B3ED',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#63B3ED'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  divider: {width: 12},
});

export default SignUp;