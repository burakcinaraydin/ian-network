# I.A.N. - International Archaeology Network

<div align="center">

![Version](https://img.shields.io/badge/version-1.0-blue)
![License](https://img.shields.io/badge/license-Educational-green)
![Status](https://img.shields.io/badge/status-Active-success)

**Uluslararası Arkeolojik Koordinasyon ve Acil Müdahale Sistemi**

[Demo](index.html) · [Dokümantasyon](PROJECT_PRESENTATION.md) · [Özellikler](#-özellikler)

</div>

---

## Proje Hakkında

**I.A.N. (International Archaeology Network)**, dünya çapındaki arkeolojik alanların korunması ve ülkeler arası koordinasyonun sağlanması için geliştirilmiş profesyonel bir web uygulamasıdır.

### Amaç

Arkeolojik mirasın korunması için:
- Merkezi veri platformu oluşturmak
- Ülkeler arası hızlı iletişim sağlamak
- Acil durumlarda koordine müdahale etmek
- Yağma ve kaçak kazılara karşı erken uyarı sistemi kurmak

---

## Önemli Notlar

### Proje Kapsamı

Bu proje **eğitim amaçlı** geliştirilmiş bir okul projesidir ve aşağıdaki koşullara tabidir:

- **Eğitim Amaçlı**: Okullar, üniversiteler ve eğitim kurumları tarafından kullanılabilir
- **Portfolyo**: Kişisel portfolyo ve özgeçmişlerde gösterilebilir
- **Araştırma**: Akademik araştırmalarda referans olarak kullanılabilir
- **First LEGO League**: Bu proje FLL yarışmasında kullanılmak üzere tasarlanmamıştır
- **Ticari Kullanım**: Ticari amaçlarla kullanılamaz
- **Üçüncü Parti Yarışmalar**: Başka yarışmalarda izinsiz kullanılamaz

### Telif Hakları ve Kullanım

```
© 2026 First Lego Leauge Maya incek proje ekibi- Tüm hakları saklıdır.

Bu projenin kaynak kodu, tasarımı, konsepti ve dokümantasyonu
telif hakkı koruması altındadır.

İzinsiz çoğaltma, dağıtma, değiştirme veya türev eser oluşturma
yasaktır. Eğitim amaçlı kullanım için lütfen iletişime geçiniz.
```

### Lisans Bilgileri

Bu proje **özel eğitim lisansı** altında paylaşılmıştır:
- Kaynak kodu incelenebilir (sadece öğrenme amaçlı)
- Doğrudan kopyalama yapılamaz
- Yarışmalarda kullanılamaz (FLL, vb.)
- Ticari kullanım yasaktır
- Referans gösterilmesi zorunludur

---

## Özellikler

### Merkezi Platform
- İnteraktif 2D dünya haritası (Leaflet.js)
- Arkeolojik alanların görsel konumlandırması
- Gerçek zamanlı veri senkronizasyonu

### Durum Yönetimi
- 🟢 **Yeşil**: Güvenli - Risk Yok
- 🔵 **Mavi**: UNESCO Dünya Mirası
- 🟡 **Sarı**: Potansiyel Risk
- 🔴 **Kırmızı**: Acil Durum

### Veri Yönetimi
- JSON formatında veri import
- Veri export özelliği
- Gelişmiş arama ve filtreleme
- Otomatik istatistikler

### Kullanıcı Deneyimi
- Keyboard shortcuts (Ctrl+N, Ctrl+K, Esc)
- Responsive tasarım (mobil uyumlu)
- Anlık bildirim sistemi
- Modern ve profesyonel arayüz

---

## Kurulum ve Kullanım

### Gereksinimler

- Modern web tarayıcı (Chrome, Firefox, Safari, LibreWolf)
- İnternet bağlantısı
- JavaScript aktif

### Çalıştırma

```bash
# Projeyi klonlayın
git clone https://github.com/burakcinaraydin/ian-network.git

# Dizine gidin
cd ian-network

# index.html dosyasını tarayıcıda açın
# Veya local server ile:
python -m http.server 8000
# http://localhost:8000 adresine gidin
```

### Kullanım Klavuzu

1. **Alan Ekleme**: Sol menüden "Add New Site" butonuna tıklayın
2. **İhbar Oluşturma**: "Create Alert" ile acil durum bildirin
3. **Haritada Gezinme**: Marker'lara tıklayarak detayları görün
4. **Filtreleme**: Sağ panelden durum bazlı filtreleyin
5. **Veri Yönetimi**: Export/Import ile veri yedekleyin

---

## Teknolojiler

### Frontend
- HTML5 - Semantik yapı
- CSS3 - Modern stil ve animasyonlar
- JavaScript (ES6+) - İşlevsellik
- Leaflet.js 1.9.4 - İnteraktif harita
- Font Awesome 6.4.0 - İkonlar

### Veri Saklama
- LocalStorage API - Tarayıcı depolama
- JSON - Veri formatı

### Özellikler
- Responsive Design - Tüm cihazlar için
- Progressive Web App prensibi - Offline çalışma
- Modern UI/UX - Kullanıcı dostu arayüz

---

## Proje Yapısı

```
ian-network/
├── index.html                      # Ana HTML dosyası
├── styles.css                      # Stil dosyası
├── app.js                          # JavaScript mantığı
├── README.md                       # Bu dosya
├── PROJECT_PRESENTATION.md         # Jüri sunumu
├── I.A.N. – International Archaeology Network.txt  # Proje detayları
└── .git/                          # Git deposu
```

---

## Demo Verileri

Sistem 11 örnek arkeolojik alan ile gelir:

| Alan | Ülke | Durum |
|------|------|-------|
| Ancient City of Ephesus | Turkey | UNESCO |
| Göbekli Tepe | Turkey | UNESCO |
| Stonehenge | UK | Secure |
| Angkor Wat | Cambodia | Secure |
| Acropolis of Athens | Greece | Secure |
| Çatalhöyük | Turkey | Secure |
| Newgrange | Ireland | Secure |
| Mesa Verde | USA | Secure |
| Chichen Itza | Mexico | Secure |
| Terracotta Army | China | Secure |
| Aktopraklık Höyük | Turkey | Secure |

---

## Eğitim Amaçlı Kullanım

### Öğrenciler İçin
Bu proje aşağıdaki konularda örnek teşkil eder:
- Web geliştirme (HTML, CSS, JavaScript)
- Harita entegrasyonu (Leaflet.js)
- LocalStorage kullanımı
- Responsive tasarım
- UI/UX prensipleri

### Öğretmenler İçin
Sınıfta kullanım senaryoları:
- Web teknolojileri dersleri
- Proje yönetimi örnekleri
- Problem çözme yaklaşımları
- Sosyal etki projeleri

---

## Gelecek Planları

### Faz 2 (Planlanan)
- [ ] Mobil uygulama (React Native)
- [ ] Çoklu dil desteği
- [ ] Gelişmiş raporlama
- [ ] Push notifications
- [ ] Yapay zeka risk analizi

### Faz 3 (Uzun Vade)
- [ ] Gerçek sunucu entegrasyonu
- [ ] Müze envanteri modülü
- [ ] Blockchain veri güvenliği
- [ ] Uydu görüntüsü entegrasyonu
- [ ] Eğitim platformu

---

## Geliştirici

**Maya Okulları İncek Proje Ekibi**

- GitHub: [@burakcinaraydin][FatalbreakCpp]

---

## Katkı

Bu proje şu an için **Açık kaynak** bir eğitim projesidir. Katkı kabul edilmemektedir.

Sorularınız için:
1. GitHub Issues kullanabilirsiniz
2. Doğrudan iletişime geçebilirsiniz
3. Dokümantasyonu inceleyebilirsiniz

---

## Atıf ve Referans

Bu projeyi akademik çalışmalarda kullanıyorsanız lütfen şu şekilde atıf yapın:

```
Aydın, B. C. (2026). I.A.N. - International Archaeology Network:
Uluslararası Arkeolojik Koordinasyon ve Acil Müdahale Sistemi.
[Eğitim Projesi]. https://github.com/burakcinaraydin/ian-network
```

---

## Sorumluluk Reddi

- Bu sistem **prototip** aşamasındadır
- Gerçek operasyonel kullanım için tasarlanmamıştır
- Veriler **demo** amaçlıdır ve gerçeği yansıtmaz
- Resmi bir kurum veya organizasyon tarafından desteklenmemektedir

---

## Sosyal Etki

Bu proje, kültürel mirasın korunmasına dikkat çekmek ve teknolojinin sosyal fayda için nasıl kullanılabileceğini göstermek amacıyla geliştirilmiştir.

> "Geçmişi koruyamayan toplumlar, geleceği inşa edemez."

---

<div align="center">

**© 2026  Maya Okulları Proje Ekibi- Tüm hakları saklıdır**

Educational Project | Not for Commercial Use | Not for FLL Competition

Made with Love for education

</div>