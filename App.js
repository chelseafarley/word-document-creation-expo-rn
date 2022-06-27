import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';

// expo add expo-file-system expo-sharing docx
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from 'docx';

export default function App() {
  const generateWordDocument = () => {
    let doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ text: "Hello YouTube", heading: HeadingLevel.TITLE }),
            new Paragraph({ text: "Do you want to learn how to create a word document?", heading: HeadingLevel.HEADING_1 }),
            new Paragraph({ text: "Of course you do!" }),
            new Paragraph({ children: [new TextRun({ text: "My", bold: true, color: "#ff0000"})], bullet: { level: 0 } }),
            new Paragraph({ text: "Bullet", bullet: { level: 0 } }),
            new Paragraph({ text: "Point", bullet: { level: 1 } }),
            new Paragraph({ text: "List!", bullet: { level: 0 } }),
          ]
        }
      ]
    });

    Packer.toBase64String(doc).then((base64) => {
      const filename = FileSystem.documentDirectory + "MyWordDocument.docx";
      FileSystem.writeAsStringAsync(filename, base64, {
        encoding: FileSystem.EncodingType.Base64
      }).then(() => {
        console.log(`Saved file: ${filename}`);
        Sharing.shareAsync(filename);
      })
    })
  };

  return (
    <View style={styles.container}>
      <Button title="Generate Word Document" onPress={generateWordDocument} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
