# ProxyNameClaimer Web

Eine webbasierte Version des ProxyNameClaimer-Tools zur Erstellung von Ubisoft-Accounts und Abfrage von IP-Standortdaten.

## Installation und Start

1. Stellen Sie sicher, dass [Node.js](https://nodejs.org/) auf Ihrem Computer installiert ist.

2. Navigieren Sie in der Kommandozeile zu dem Verzeichnis, in dem Sie die Dateien gespeichert haben.

3. Führen Sie den folgenden Befehl aus, um die erforderlichen Abhängigkeiten zu installieren:
   ```
   npm install
   ```

4. Starten Sie die Anwendung:
   ```
   npm start
   ```

5. Öffnen Sie in Ihrem Browser die folgende Adresse:
   ```
   http://localhost:3000
   ```

## Dateien und Verzeichnisstruktur

Bei der Ersteinrichtung sollten Sie die folgenden Dateien in einem Verzeichnis haben:

```
proxy-name-claimer/
├── server.js                # Server-Hauptdatei
├── package.json             # Projekt-Abhängigkeiten
├── accounts.json            # Wird automatisch erstellt (Speicherung der Accounts)
└── public/                  # Verzeichnis für statische Dateien
    ├── index.html           # HTML-Oberfläche
    └── script.js            # Client-seitiges JavaScript
```

## Funktionen

### 1. Account erstellen
- Geben Sie eine E-Mail-Adresse ein (z.B. beispiel@gmail.com)
- Wählen Sie ein Land aus
- Das Tool erstellt einen Account mit einem zufälligen Namen und speichert diesen

### 2. IP-Standortabfrage
- Geben Sie eine IP-Adresse ein
- Optional können Sie einen erstellten Account für erweiterte Informationen auswählen
- Zeigt detaillierte Standortinformationen zur IP-Adresse an

### 3. Verfügbare Länder
- Zeigt eine Liste aller unterstützten Länder mit ihren Codes an

### 4. Accounts verwalten
- Zeigt eine Liste aller erstellten Accounts an
- Bietet die Möglichkeit, alle Accounts zu löschen

## Fehlerbehandlung

Sollten Probleme auftreten:

1. Überprüfen Sie, ob alle Dateien vorhanden sind
2. Stellen Sie sicher, dass alle Abhängigkeiten installiert sind
3. Prüfen Sie, ob Port 3000 frei ist (falls nicht, ändern Sie den Port in server.js)
4. Überprüfen Sie die Konsolenausgabe des Servers auf Fehlermeldungen

## Hinweise

- Alle erstellten Accounts werden lokal in der Datei `accounts.json` gespeichert
- Das Standardpasswort für alle Accounts ist "D1gnityHere*"
- Die Anwendung verwendet die originalen API-Endpunkte von Ubisoft
