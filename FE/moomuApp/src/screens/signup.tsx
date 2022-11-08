import React, {useState,useEffect, useRef}from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Alert,
} from 'react-native';
import Button1 from '../components/button1';
import axios from "../api/axios";
import requests from "../api/requests";
import SelectDropdown from 'react-native-select-dropdown';

type regions = {
  name : string,
  id : number
}

const SignUp = ( props : any) => {
  // 회원가입 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [region, setRegion] = useState<number>();
  const [group, setGroup] = useState<number>();

  // 유효성검사
  const [isId, setIsId] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState<boolean>(false);

  // 지역
  const [selected, setSelected] = useState(undefined);
  const [regions,setRegions] = useState<regions[]>([] as regions[]);

  //오류메시지 상태저장
  const [passwordMessage, setPasswordMessage] = useState<string>('')
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('')

  // 비밀번호
  // const onChangePassword = () => {
  //   const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
  //   const passwordCurrent = e.target.value
  //   setPassword(passwordCurrent)

  //   if (!passwordRegex.test(passwordCurrent)) {
  //     setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
  //     setIsPassword(false)
  //   } else {
  //     setPasswordMessage('안전한 비밀번호에요 : )')
  //     setIsPassword(true)
  //   }
  // }

  // 비밀번호 확인
  // const onChangePasswordConfirm = () => {
  //     const passwordConfirmCurrent = e.target.value
  //     setPasswordCheck(passwordConfirmCurrent)

  //     if (password === passwordConfirmCurrent) {
  //       setPasswordCheckMessage('비밀번호를 똑같이 입력했어요 : )')
  //       setIsPasswordCheck(true)
  //     } else {
  //       setPasswordCheckMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ')
  //       setIsPasswordCheck(false)
  //     }
  //   }

  // 지역 받아오기
  useEffect( () => {
    axios.get(requests.regions)
    .then((response) => {
      setRegions(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  },[]);

  // 회원 등록 버튼 onPress
  const signUpbutton = () => {
    axios.post(requests.register,{
      username : username,
      password : password,
      nickname : nickname,
      region_id : region, 
      class_group : group,
    }, {
      headers : {"Content-Type": `application/json`}
    })
    .then((response) => {
      // console.log('회원가입성공');
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
      props.condition(true);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  // disabled={!(isId && isPassword && isPasswordCeck)}

  return (
    <View style={styles.container3}>
      <TextInput style={styles.input} placeholder='   아이디' onChangeText={(text) => setUsername(text)} returnKeyType="next" ></TextInput>
      <TextInput style={styles.input} placeholder='   비밀번호' onChangeText={(text) => setPassword(text)} returnKeyType="next" ></TextInput>
      <TextInput style={styles.input} placeholder='   비밀번호 확인' onChangeText={(text) => setPasswordCheck(text)} returnKeyType="next"></TextInput>
      <TextInput style={styles.input} placeholder='   이름' onChangeText={(text) => setNickname(text)} returnKeyType="next" ></TextInput>

      {/* <TextInput style={styles.input} placeholder='지역'></TextInput> */}
      <View style={[{flexDirection:'row'}]}>
      <SelectDropdown
              data={regions}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);
                setRegion(selectedItem.id);
              }}
              defaultButtonText={'지역선택'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
      />
      <View style={styles.divider} />
      <TextInput style={[styles.input, {width:80}]} keyboardType="number-pad" placeholder='   반' onChangeText={(text) => setGroup(+text)} onSubmitEditing={signUpbutton}></TextInput>
      </View>
      <Button1 text={'회원 등록'} onPress={signUpbutton}></Button1>
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
    width: 150,
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