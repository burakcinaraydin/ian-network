# I.A.N. - International Archaeology Network

<div align="center">

![Version](https://img.shields.io/badge/version-2.0-blue)
![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red)
![Status](https://img.shields.io/badge/usage-View%20Only-orange)

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
├── PROJECT_PRESENTATION.md         # Proje sunumu ve detayları
├── LICENSE                         # CC BY-NC 4.0 Lisansı
├── I.A.N. – International Archaeology Network.txt  # Proje dokümantasyonu
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

**Maya Okulları İncek Yerleşkesi Proje Ekibi**

- GitHub: [@burakcinaraydin](https://github.com/burakcinaraydin)[FatalbreakCpp](https://github.com/FatalbreakCpp)

---

## Katkı

**Bu proje kapalı geliştirme sürecine tabidir. Harici katkılar kabul edilmemektedir.**

### Proje Kullanım Politikası:
- ✅ Yerel geliştirme ortamında inceleme amaçlı çalıştırılabilir
- ✅ Eğitim ve araştırma amacıyla kod analizi yapılabilir
- ❌ Üretim ortamlarında veya kişisel projelerde kullanım yasaktır
- ❌ Kaynak kodda değişiklik yapılarak dağıtım yasaktır
- ❌ Fork ve Pull Request işlemleri değerlendirilmeyecektir
- ❌ Kodun kopyalanarak başka projelerde kullanımı telif hakkı ihlalidir

⚠️ **Dikkat**: Proje inceleme ve öğrenme amacıyla kullanılabilir, ancak herhangi bir üretim amaçlı kullanımı yasaktır.

---

## Atıf ve Referans

Bu projeyi çalışmalarınızda kullanıyorsanız lütfen şu şekilde atıf yapın:

```
Maya Okulları İncek Yerleşkesi Proje Ekibi (2026).
I.A.N. - International Archaeology Network:
Uluslararası Arkeolojik Koordinasyon ve Acil Müdahale Sistemi.
[Eğitim ve Araştırma Projesi]. https://github.com/burakcinaraydin/ian-network
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

## Lisans

Bu proje **Özel İnceleme Lisansı (Study-Only License)** altında lisanslanmıştır. Detaylı lisans metni için [LICENSE](LICENSE) dosyasını inceleyiniz.

### İzin Verilen Kullanımlar:
- ✅ Kaynak kodunun GitHub platformunda görüntülenmesi
- ✅ Projenin yerel geliştirme ortamında incelenmek üzere indirilmesi ve çalıştırılması
- ✅ Eğitim ve öğrenme amaçlı kod analizi
- ✅ Akademik çalışmalarda referans kaynağı olarak kullanım
- ✅ Eğitim kurumlarında ders materyali olarak kullanım

### Yasak Kullanımlar:
- ❌ **Ticari Kullanım**: Projenin ticari amaçlarla kullanımı kesinlikle yasaktır
- ❌ **Proje Entegrasyonu**: Kaynak kodun kısmen veya tamamen başka projelere dahil edilmesi yasaktır
- ❌ **Portfolyo Kullanımı**: Projenin kişisel portfolyo veya özgeçmişte kendi çalışması olarak gösterilmesi yasaktır
- ❌ **Yarışma Katılımı**: Projenin başka yarışmalarda kullanılması yasaktır
- ❌ **Türev Eser Oluşturma**: Projenin değiştirilerek yeni eser oluşturulması ve dağıtılması yasaktır
- ❌ **Dağıtım**: Projenin üçüncü kişilere dağıtılması, satılması veya lisanslanması yasaktır

⚠️ **Önemli Not**: Bu proje yalnızca inceleme ve öğrenme amacıyla kullanılabilir. Herhangi bir üretim ortamında veya kişisel projelerde kullanımı telif hakkı ihlali teşkil eder.

---

<div align="center">

**© 2026 Maya Okulları İncek Yerleşkesi Proje Ekibi**
**Tüm Hakları Saklıdır - All Rights Reserved**

Study-Only License | Non-Commercial | Educational Use Only

⚠️ **Yasal Uyarı**: Bu proje yalnızca inceleme amaçlıdır. Üretim ortamında kullanımı telif hakkı ihlali teşkil eder.

Made with ❤️ for cultural heritage preservation

</div>