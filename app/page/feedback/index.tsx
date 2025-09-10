import React from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Text, Surface, Avatar, Chip, Card } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const GRAD = ["#6b74ff", "#7b5bff"];
const BG = "#f2f6fb";

type Student = {
  id: string;
  name: string;
  sport: string;
  last: string;
  unprocessed: number;
  total: number;
};

const STUDENTS: Student[] = [
  { id: "1", name: "Alex Chen", sport: "Tennis", last: "March 15, 2025", unprocessed: 2, total: 8 },
  { id: "2", name: "Maria Rodriguez", sport: "Swimming", last: "March 14, 2025", unprocessed: 0, total: 4 },
  { id: "3", name: "Kevin Martinez", sport: "Golf", last: "Never", unprocessed: 0, total: 0 },
  { id: "4", name: "Alex Chen", sport: "Tennis", last: "March 15, 2025", unprocessed: 2, total: 8 },
  { id: "5", name: "Maria Rodriguez", sport: "Swimming", last: "March 14, 2025", unprocessed: 0, total: 4 },
  { id: "6", name: "Kevin Martinez", sport: "Golf", last: "Never", unprocessed: 0, total: 0 },
];

export default function FeedbackRecords() {
  const router = useRouter();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header gradient with title + filter pill */}
      <LinearGradient colors={GRAD} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.header}>
        <Text style={styles.title}>Feedback Records</Text>
        <Pressable style={styles.filterPill} onPress={() => {}}>
          <Text style={styles.filterText}>◉ Filter</Text>
        </Pressable>

        {/* KPI tiles */}
        <View style={styles.kpiRow}>
          <KPI value="12" label="Total Students" />
          <KPI value="4.6" label="Average Rating" />
          <KPI value="47" label="Total Inquiries" />
          <KPI value="8" label="Unprocessed" active />
        </View>
      </LinearGradient>

      <Surface style={styles.block} elevation={1}>
        <View style={styles.blockHeader}>
          <Text style={styles.blockTitle}>📚  Student Management</Text>
        </View>

        <View style={{ gap: 10 }}>
          {STUDENTS.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => router.push({ pathname: "/page/feedback/detail", params: { id: s.id } })}
            >
              <Surface style={styles.studentRow} elevation={0}>
                <Avatar.Text size={42} label={s.name.split(" ").map(w=>w[0]).slice(0,2).join("")} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.studentName}>{s.name}</Text>
                  <Text style={styles.studentSub}>
                    {s.sport} • Last session: {s.last}
                  </Text>
                </View>
                <Badge value={s.unprocessed} label="UNPROCESSED" kind="danger" />
                <Badge value={s.total} label="TOTAL" kind="success" />
              </Surface>
            </Pressable>
          ))}
        </View>
      </Surface>
    </ScrollView>
  );
}

function KPI({ value, label, active=false }: { value: string; label: string; active?: boolean }) {
  return (
    <Surface style={[styles.kpi, active && styles.kpiActive]} elevation={0}>
      <Text style={[styles.kpiValue, active && { color: "#fff" }]}>{value}</Text>
      <Text style={[styles.kpiLabel, active && { color: "#eaf2ff" }]}>{label}</Text>
    </Surface>
  );
}

function Badge({
  value,
  label,
  kind,
}: {
  value: number;
  label: string;
  kind: "danger" | "success";
}) {
  const bg = kind === "danger" ? "#fde8e8" : "#e9fbf1";
  const br = kind === "danger" ? "#fca5a5" : "#86efac";
  const tx = kind === "danger" ? "#b91c1c" : "#047857";
  return (
    <View style={[styles.badge, { backgroundColor: bg, borderColor: br }]}>
      <Text style={[styles.badgeNum, { color: tx }]}>{value}</Text>
      <Text style={[styles.badgeLabel, { color: tx }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  content: { paddingBottom: 26 },
  header: { paddingTop: 22, paddingBottom: 14, paddingHorizontal: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 14 },
  title: { color: "#fff", fontSize: 20, fontWeight: "800" },
  filterPill: { position: "absolute", right: 12, top: 16, backgroundColor: "#ffffff33", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 18 },
  filterText: { color: "#fff", fontWeight: "700" },
  kpiRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  kpi: { flex: 1, backgroundColor: "#ffffff1a", borderRadius: 10, paddingVertical: 10, alignItems: "center" },
  kpiActive: { backgroundColor: "#5c62ff" },
  kpiValue: { fontSize: 20, fontWeight: "800", color: "#fff" },
  kpiLabel: { color: "#eef2ff", fontSize: 12, marginTop: 4 },

  block: { marginTop: 12, marginHorizontal: 12, backgroundColor: "#fff", borderRadius: 12, padding: 12 },
  blockHeader: { marginBottom: 8 },
  blockTitle: { fontSize: 16, fontWeight: "800", color: "#1f2937" },

  studentRow: { flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#fafbff", borderRadius: 12, borderWidth: 1, borderColor: "#eef2ff" },
  studentName: { fontWeight: "800", color: "#0f172a" },
  studentSub: { color: "#6b7280", marginTop: 2 },

  badge: { marginLeft: 8, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, borderWidth: 1, alignItems: "center" },
  badgeNum: { fontWeight: "800", fontSize: 16, lineHeight: 16 },
  badgeLabel: { fontSize: 10, marginTop: 2, fontWeight: "700" },
});
