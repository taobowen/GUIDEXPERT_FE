import React from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Text, Surface, Avatar, Chip, Card, Button, Divider } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";

const GRAD = ["#6b74ff", "#7b5bff"];
const BG = "#f2f6fb";

export default function StudentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // mocked, replace with fetched data by id
  const name = "Alex Chen";
  const sport = "Tennis";
  const last = "March 15, 2025";
  const unprocessed = 2;
  const total = 8;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header */}
      <LinearGradient colors={GRAD} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Text style={{ color: "#fff", fontWeight: "800" }}>‹</Text>
          </Pressable>
          <Avatar.Text size={44} label="AC" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.sub}>{sport} • Last session: {last}</Text>
          </View>
        </View>

        <View style={styles.kpiRow}>
          <HeaderPill value={String(unprocessed)} label="UNPROCESSED" />
          <HeaderPill value={String(total)} label="TOTAL" />
        </View>
      </LinearGradient>

      {/* Unprocessed Inquiries */}
      <Text style={styles.sectionTitle}>⚠️  Unprocessed Inquiries</Text>
      <Surface style={styles.inquiryCard} elevation={1}>
        <View style={styles.inquiryTop}>
          <Text style={styles.inquirer}>Sarah Chen</Text>
          <View style={styles.newPill}><Text style={styles.newText}>NEW</Text></View>
        </View>

        <Card style={styles.bluePlayer} mode="elevated">
          <View style={styles.playWrap}>
            <Text style={{ color: "#fff" }}>▶</Text>
          </View>
          <Text style={styles.playerTitle}>Session Recording</Text>
          <Text style={styles.playerSub}>Click to review and provide feedback</Text>
        </Card>

        <View style={styles.tagRow}>
          <Chip style={styles.tagBlue} textStyle={styles.tagBlueText}>SCREENCAST</Chip>
          <Chip mode="outlined" style={styles.tagOutline}>CASI</Chip>
          <Chip style={styles.tagFlag} textStyle={{ color: "#fff", fontWeight: "800" }}>FLAG</Chip>
        </View>

        <Surface style={styles.noteBox} elevation={0}>
          <Text style={styles.noteLabel}>Sarah Chen:</Text>
          <Text style={styles.noteText}>
            Having trouble with weight transfer during parallel turns. Need guidance on proper technique.
          </Text>
        </Surface>
      </Surface>

      {/* All Feedback Records */}
      <Text style={styles.sectionTitle}>📁  All Feedback Records (8 sessions)</Text>

      <Surface style={styles.sessionCard} elevation={1}>
        <View style={styles.sessionHeader}>
          <Text style={styles.sessionTitle}>Parallel Turn Practice</Text>
          <Text style={styles.sessionTime}>March 16, 2025 • 2:30 PM</Text>
        </View>

        {/* Coach Feedback */}
        <Surface style={styles.coachBox} elevation={0}>
          <Text style={styles.coachLabel}>🏅  Coach Feedback</Text>
          <Text style={styles.coachText}>
            Excellent improvement on your parallel turns! Your weight distribution has gotten much better since last session.
            Focus more on keeping your upper body facing downhill during transitions. [1:23] Notice how your shoulders rotate with the skis – try to keep them stable. Overall fantastic progress! ❤️
          </Text>
        </Surface>

        {/* Student Rating */}
        <Surface style={styles.ratingBox} elevation={0}>
          <Text style={styles.ratingLabel}>⭐  Student Rating & Comment</Text>
          <Text style={styles.ratingStars}>★★★★★  5.0/5.0</Text>
          <Text style={styles.ratingText}>
            "Really helpful feedback! The timestamp references made it easy to see exactly what you meant. I'll definitely work on keeping my shoulders stable. Thank you for the detailed analysis!"
          </Text>
        </Surface>

        {/* Session Video */}
        <Text style={styles.sessionSub}>🎞  Session Video</Text>
        <Card style={styles.grayPlayer} mode="elevated">
          <View style={styles.playWrapDark}>
            <Text style={{ color: "#fff" }}>▶</Text>
          </View>
          <Text style={styles.playerTitle}>Mogul Analysis</Text>
          <Text style={styles.playerSub}>1:45 minutes</Text>
        </Card>
      </Surface>

      <Divider style={{ opacity: 0, height: 20 }} />
    </ScrollView>
  );
}

function HeaderPill({ value, label }: { value: string; label: string }) {
  return (
    <Surface style={styles.headerPill} elevation={0}>
      <Text style={styles.headerPillValue}>{value}</Text>
      <Text style={styles.headerPillLabel}>{label}</Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  content: { paddingBottom: 26 },

  header: { paddingTop: 18, paddingBottom: 16, paddingHorizontal: 12, borderBottomLeftRadius: 14, borderBottomRightRadius: 14 },
  back: { marginRight: 6, paddingRight: 6, paddingVertical: 6 },
  name: { color: "#fff", fontSize: 18, fontWeight: "800" },
  sub: { color: "#eaf2ff", marginTop: 2 },

  kpiRow: { flexDirection: "row", gap: 10, marginTop: 12 },
  headerPill: { flex: 1, backgroundColor: "#ffffff1a", borderRadius: 12, paddingVertical: 10, alignItems: "center" },
  headerPillValue: { color: "#fff", fontSize: 18, fontWeight: "800" },
  headerPillLabel: { color: "#eaf2ff", marginTop: 4, fontWeight: "700" },

  sectionTitle: { marginTop: 14, marginHorizontal: 12, fontWeight: "800", color: "#1f2937" },

  inquiryCard: { marginTop: 8, marginHorizontal: 12, backgroundColor: "#fff", borderRadius: 12, padding: 10 },
  inquiryTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  inquirer: { fontWeight: "800", color: "#b91c1c" },
  newPill: { backgroundColor: "#fee2e2", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, borderWidth: 1, borderColor: "#fecaca" },
  newText: { color: "#b91c1c", fontWeight: "800" },

  bluePlayer: { backgroundColor: "#3da2ff", borderRadius: 12, overflow: "hidden", alignItems: "center", paddingVertical: 20, marginTop: 10 },
  playWrap: { width: 46, height: 46, borderRadius: 23, backgroundColor: "#0005", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  playerTitle: { color: "#fff", fontWeight: "800" },
  playerSub: { color: "#eaf2ff", marginTop: 2 },

  tagRow: { flexDirection: "row", gap: 8, marginTop: 10 },
  tagBlue: { backgroundColor: "#60a5fa" },
  tagBlueText: { color: "#fff", fontWeight: "800" },
  tagOutline: { borderColor: "#cbd5e1" },
  tagFlag: { backgroundColor: "#f59e0b" },

  noteBox: { marginTop: 10, backgroundColor: "#fff7ed", borderWidth: 1, borderColor: "#fed7aa", borderRadius: 10, padding: 10 },
  noteLabel: { color: "#9a3412", fontWeight: "800" },
  noteText: { color: "#9a3412", marginTop: 4 },

  sessionCard: { marginTop: 14, marginHorizontal: 12, backgroundColor: "#fff", borderRadius: 12, padding: 10 },
  sessionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#6b74ff", padding: 10, borderRadius: 10 },
  sessionTitle: { color: "#fff", fontWeight: "800" },
  sessionTime: { color: "#eaf2ff", fontWeight: "700" },

  coachBox: { marginTop: 10, backgroundColor: "#dcfce7", borderRadius: 10, padding: 10 },
  coachLabel: { fontWeight: "800", color: "#065f46" },
  coachText: { color: "#065f46", marginTop: 6, lineHeight: 20 },

  ratingBox: { marginTop: 10, borderLeftWidth: 4, borderLeftColor: "#fb923c", backgroundColor: "#fff7ed", borderRadius: 10, padding: 10 },
  ratingLabel: { color: "#9a3412", fontWeight: "800" },
  ratingStars: { color: "#9a3412", fontWeight: "800", marginTop: 4 },
  ratingText: { color: "#9a3412", marginTop: 6, lineHeight: 20 },

  sessionSub: { marginTop: 12, fontWeight: "800", color: "#1f2937" },
  grayPlayer: { backgroundColor: "#1f2937", borderRadius: 12, overflow: "hidden", alignItems: "center", paddingVertical: 20, marginTop: 8 },
  playWrapDark: { width: 46, height: 46, borderRadius: 23, backgroundColor: "#ffffff22", alignItems: "center", justifyContent: "center", marginBottom: 8 },
});
