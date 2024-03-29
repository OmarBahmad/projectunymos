import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./pages/home";
import { ProposalFormScreen } from "./pages/proposal";
import { PieChartScreen } from "./pages/chart";

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: "#000",
        headerStyle: { backgroundColor: "#42a5f5" },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Propostas de Venda",
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProposalFormScreen}
        options={{
          title: "Criar Propostas",
        }}
      />
      <Stack.Screen
        name="Report"
        component={PieChartScreen}
        options={{
          title: "Relatórios",
        }}
      />
    </Stack.Navigator>
  );
}
