// import React, { useState } from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import AuthLayout from '../../components/AuthLayout';
import Button from '../../components/Button';
import { Link, Stack, router, useRouter } from 'expo-router';
import * as yup from 'yup'
import { Formik } from 'formik'
import TextInputGlobal from '../../components/TextInputGlobal';
import { changeProfileAfterSignUp, login } from '../../api/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getInfor } from '../../api/profile/profile';
import { useSelector, useDispatch } from 'react-redux';
import { setUserId } from '../../store/auth';


export default Login = (props) => {
  const router2 = useRouter();
  const signUpInfor = useSelector((state) => state.auth.userInforSignIn)
  const dispatch = useDispatch()
  // const [userEmail, setUserEmail] = useState("")
  return (
    <AuthLayout isLogin = {true}>
      <Formik
        initialValues={{ 
          // name: '',
          email: "phanthinhpt@gmail.com", 
          password: "Thinh123" 
        }}
        onSubmit={ (values) => {
            let data = {
              email: values.email,
              password: values.password,
              uuid: "string"
            }
            login(data)
            .then(async res => {
              console.log("token", res.data.token)
              await AsyncStorage.setItem('token',"Bearer " + res.data.token);
              // getInfor({user_id: res.data.id})
              // .then((res) => {
              //   console.log("res", res)
              // })
              // .catch((err) => {
              //   console.log("err get infor", err)
              // })
              // Alert.alert(
              //     "Success", // Tiêu đề của cửa sổ thông báo
              //     "login success", // Nội dung của cửa sổ thông báo
              //     [{
              //       text: 'OK',
              //       onPress: () => {
              //         dispatch(setUserId(res.data.id))
              //         if(res.data.username == "") {
              //               router.push('/auth/sign-up/ChangeInfoAfterSignUpScreen');
              //         } else {
              //               router.push({pathname: "/profile/profile", params: {userId: res.data.id}})
              //         }
              //       },
                   
              //        // Hàm này sẽ được gọi khi người dùng nhấn "OK"
              //     }, ],
              //   );
              dispatch(setUserId(res.data.id))
              if (res.data.username == "") {
                router.push('/auth/sign-up/ChangeInfoAfterSignUpScreen');
              } else {
                router.push({
                  pathname: "/profile/profile",
                  params: {
                    userId: res.data.id
                  }
                })
              }
            })
            .catch((err) => {
                console.log("err", err)
            })
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('email invalid')
            .required('Please, provide your email!'),
          password: yup
            .string()
            .min(8, "password at least 8 characters")
            .required('password is required')
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, "must include uppercase, lowercase, number and special character"),
        })}
       >
         {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
           <View style={styles.form}>
           <TextInputGlobal
             placeholder="Email"
             keyboardType="email-address"
             icon={require('../../assets/images/mail/mail.png')}
             value = {values.email}
             onChangeText={handleChange('email')}
            onBlur={() => setFieldTouched('email')}
           />
            {touched.email && errors.email &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
            }
             <TextInputGlobal
            //  secureTextEntry={!showPassword} 
               placeholder="Password"
               value={values.password}
               onChangeText={handleChange('password')}
               onBlur={() => setFieldTouched('password')}
               isPasswordField = {true}
               icon={require('../../assets/images/password/password.png')}
             />
             {touched.password && errors.password &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
             }
           <Button title="Log In" onPress={handleSubmit}/>
           <Link href="auth/forgotpassword" underlayColor="#f0f4f7" style={styles.navItemContainer}>
            <Text style={styles.navItemText}>Forgot password ?</Text>
           </Link>
           <Stack options={{ title: "login" }} />
         </View>
         )}
       </Formik>
    </AuthLayout>
  );
};
const styles = StyleSheet.create({
  form: {
    paddingTop: 25,
  },
  navItemContainer: {
    marginTop: 35,
    alignSelf: 'center',
  },
  navItemText: {
    fontSize: 18,
    color: '#696969',
    fontFamily: 'Poppins-Medium',
  }
});