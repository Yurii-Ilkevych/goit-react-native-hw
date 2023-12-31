import {
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SharedLayout from "../components/SharedLayout";
import { useDispatch } from "react-redux";
import { loginDB } from "../redux/authUser/authOperators";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { errorNotifications } from "../helpers/errorNotifications";

export default LoginScreen = () => {
  const [isFocusInputEmail, setIsFocusInputEmail] = useState(false);
  const [isFocusInputPassword, setIsFocusInputPassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading, errorLogin } = useUser();

  const onLogin = () => {

    if(email.length=== 0|| password=== 0){
      this.toast.show("All fields must be filled", 2500);
      return
    }

    const research = hundleResearchForm()
    if(research !== 200){
      this.toast.show(research, 2500);
      return
    }

    dispatch(loginDB({ email, password }));
  };


  const hundleResearchForm = ()=>{
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if(!emailRegex.test(email)){
      return "Email is not valid"
    }else if(password.length < 3){
      return "Password must contain min 6 symbol"
    }
    return 200
  }

  useEffect(() => {
    if (errorLogin) {
      errorNotifications(errorLogin)
    }
  }, [errorLogin]);

  return (
    <SharedLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={-242}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <Spinner visible={isLoading} />
            <View style={styles.boxAuth}>
              <Text style={styles.loginText}>Увійти</Text>

              <View style={styles.boxInput}>
                <TextInput
                  onFocus={() => {
                    setIsFocusInputEmail(true);
                  }}
                  onBlur={() => {
                    setIsFocusInputEmail(false);
                  }}
                  autoComplete="email"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(el) => {
                    setEmail(el.trim());
                  }}
                  placeholder="Адреса електронної пошти"
                  style={[
                    styles.commonInput,
                    isFocusInputEmail && styles.isFocus,
                  ]}
                ></TextInput>
                <View style={styles.wrapperPasswordInput}>
                  <TextInput
                    onFocus={() => {
                      setIsFocusInputPassword(true);
                    }}
                    onBlur={() => {
                      setIsFocusInputPassword(false);
                    }}
                    secureTextEntry={isShowPassword}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(el) => {
                      setPassword(el.trim());
                    }}
                    placeholder="Пароль"
                    autoComplete="password"
                    style={[
                      styles.commonInput,
                      isFocusInputPassword && styles.isFocus,
                    ]}
                  ></TextInput>
                  <TouchableOpacity
                    onPress={() => setIsShowPassword((prev) => !prev)}
                  >
                    <Text style={styles.btnShowPasswordText}>
                      {isShowPassword ? "Показати" : "Приховати"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.btnLogin} onPress={onLogin}>
                <Text style={styles.btnLoginText}>Увійти</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signInBtn}
                onPress={() => {
                  navigation.navigate("RegistrationScreen");
                }}
              >
                <Text style={styles.signInText}>
                  Немає акаунту? Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SharedLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  boxAuth: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  loginText: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
    marginRight: "auto",
    marginLeft: "auto",
    marginVertical: 32,
  },
  boxInput: {
    rowGap: 16,
  },
  commonInput: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 10,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 15,
  },
  wrapperPasswordInput: {
    position: "relative",
  },
  btnShowPasswordText: {
    color: "#1B4371",
    position: "absolute",
    bottom: 15,
    right: 16,
  },
  isFocus: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },
  btnLoginText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#FFFFFF",
    marginRight: "auto",
    marginLeft: "auto",
  },
  btnLogin: {
    borderRadius: 100,
    marginTop: 43,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
    paddingVertical: 16,
  },
  signInBtn: {
    marginBottom: 111,
  },
  signInText: {
    fontFamily: "Roboto-Regular",
    lineHeight: 18.75,
    color: "#1B4371",
    marginRight: "auto",
    marginLeft: "auto",
  },
});
