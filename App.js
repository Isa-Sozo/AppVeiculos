import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator 
} from "react-native";

export default function App() {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fabiooliveira.cloud/api_aula/veiculos/", {
      headers: {
        Authorization: "c6a8ea3f9c1e47b2d89f0d41b7f3c2d0"
      }
    })
      .then(response => response.json())
      .then(data => {
        setVeiculos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar API:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando veículos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista de Veículos</Text>
      {veiculos.map((item) => (
        <View key={item.codVeiculo} style={styles.card}>
          <Image source={{ uri: item.linkFoto }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.modelo}>{item.modelo}</Text>
            <Text style={styles.marca}>{item.marca}</Text>
            <Text style={styles.detalhes}>Ano: {item.anoFabricacao}</Text>
            <Text style={styles.preco}>Preço: R$ {item.preco}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#808080",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  info: {
    padding: 10,
  },
  modelo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  marca: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  detalhes: {
    fontSize: 14,
    color: "#777",
  },
  preco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
    marginTop: 5,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
