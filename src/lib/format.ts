export const formatPrice = (n: number) => `${n.toLocaleString("ar-EG")} ج.م`;

export const statusLabels: Record<string, string> = {
  new: "جديد",
  preparing: "جاري التجهيز",
  delivering: "خرج للتوصيل",
  done: "مكتمل",
  cancelled: "ملغي",
  contacted: "تم التواصل",
  confirmed: "مؤكد",
};

export const paymentMethods = [
  "الدفع عند الاستلام (كاش)",
  "إنستاباي (InstaPay)",
  "محفظة إلكترونية (فودافون كاش / اتصالات كاش)",
];

export const occasionTypes = [
  "بوكس خزين البيت الشهري (عدّي الألف وسحب الميكروويف)",
  "كرتونة الخير والصدقات الجارية",
  "طلبات جملة ومطاعم وكافيهات",
  "توريد شركات ومؤسسات بمدينة بدر",
  "استفسار أو اقتراح",
  "شكوى للإدارة",
];
