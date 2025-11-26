// src/screens/Chart/ChartScreen.tsx
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useTheme } from "react-native-paper";
import useChartData from "./hooks/useChartData";

const { width } = Dimensions.get('window');
const CHART_SIZE = width * 0.8;
const CHART_RADIUS = CHART_SIZE / 2;

export default function ChartScreen() {
  const { incomeChartData, expenseChartData, loading } = useChartData();
  const { colors } = useTheme();

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10, color: '#888' }}>Preparando gráficos...</Text>
      </View>
    );
  }

  // Helper para renderizar um gráfico de rosca (Donut Chart)
  const renderChart = (title: string, data: any[], primaryColor: string) => {
    const total = data.reduce((sum: number, item: any) => sum + item.value, 0);

    // Se não houver dados, exibe uma mensagem
    if (data.length === 0) {
      return (
        <View style={styles.chartSection}>
          <Text style={[styles.chartTitle, { color: primaryColor }]}>{title}</Text>
          <Text style={styles.noDataText}>Nenhum dado registrado para este mês.</Text>
        </View>
      );
    }

    return (
      <View style={styles.chartSection}>
        <Text style={[styles.chartTitle, { color: primaryColor }]}>{title}</Text>
        
        <PieChart
          donut
          radius={CHART_RADIUS}
          data={data}
          // PROPRIEDADE sectionDelimiterSize FOI REMOVIDA
          centerLabelComponent={() => (
            <View style={styles.centerLabel}>
                <Text style={{fontSize: 14, color: '#888'}}>Total:</Text>
                <Text style={[styles.centerTotal, {color: primaryColor}]}>R$ {total.toFixed(2)}</Text>
            </View>
          )}
          // Configurações para fazer parecer um donut chart
          innerRadius={CHART_RADIUS * 0.6}
        />
        
        {/* Legenda (map data) */}
        <View style={styles.legendContainer}>
            {data.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendIndicator, { backgroundColor: item.color }]} />
                    <Text style={styles.legendText}>
                        {item.label} (R$ {item.value.toFixed(2)})
                    </Text>
                </View>
            ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Gráfico de Despesas */}
      {renderChart("Distribuição de Despesas", expenseChartData, colors.error)}

      {/* Separador */}
      <View style={styles.separator} />

      {/* Gráfico de Receitas */}
      {renderChart("Distribuição de Receitas", incomeChartData, colors.primary)}

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 45,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartSection: {
    marginBottom: 30,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  centerLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  centerTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  legendContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 30,
    width: '100%',
  },
  noDataText: {
    color: '#888',
    marginTop: 15,
    fontSize: 16,
  }
});