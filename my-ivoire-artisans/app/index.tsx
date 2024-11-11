
import { Text, View } from "react-native";
import { useRouter } from "expo-router"; 
import { darkGreen } from "./Constants";
import Btn from "./Btn";

const Index = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Btn
        bgColor="white"
        textColor={darkGreen}
        btnLabel="Signup"
        Press={() => router.push("/Home")}
      />
    </View>
  );
};

export default Index;
