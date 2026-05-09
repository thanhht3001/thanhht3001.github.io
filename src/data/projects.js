export const projects = [
  {
    id: 'xmleditor-bhyt',
    title: {
      vi: 'XML Editor BHYT — Công cụ chỉnh sửa XML Bảo hiểm Y tế',
      en: 'XML Editor BHYT — Healthcare Insurance XML Editor'
    },
    description: {
      vi: 'Công cụ chuyên dụng chỉnh sửa file XML bảo hiểm y tế Việt Nam. Hỗ trợ upload, chỉnh sửa inline dạng bảng, theo dõi thay đổi, xác thực dữ liệu và xuất file XML.',
      en: 'Specialized tool for editing Vietnam healthcare insurance XML files. Supports upload, inline grid editing, change tracking, data validation, and XML export.'
    },
    tech: ['Blazor Web', '.NET', 'C#', 'Bootstrap 5'],
    demo: 'https://xmleditor.thanhht.org',
    featured: true
  },
  {
    id: 'pharmacy-retail',
    title: {
      vi: 'Pharmacy Retail — Hệ thống Quản lý Nhà thuốc',
      en: 'Pharmacy Retail — Pharmacy Management System'
    },
    description: {
      vi: 'Hệ thống quản lý nhà thuốc bán lẻ Đông Tây Y với kiến trúc Clean Architecture. Tích hợp đơn thuốc quốc gia, POS đa tab, quản lý kho, báo cáo phân tích và hỗ trợ multi-tenant SaaS.',
      en: 'Retail pharmacy management system for Western & Traditional medicine with Clean Architecture. Integrates national e-prescription, multi-tab POS, inventory management, analytics, and multi-tenant SaaS support.'
    },
    tech: ['Blazor Server', 'ASP.NET Core', 'SQL Server', 'Redis', 'WPF', 'Docker'],
    github: 'https://github.com/thanhht3001/pharmacy-web',
    demo: 'https://pharmacy.thanhht.org',
    featured: true
  },
  {
    id: 'coms',
    title: {
      vi: 'CoMS — Hệ thống Quản lý Nội dung Nhóm',
      en: 'CoMS — Team Content Management System'
    },
    description: {
      vi: 'Đồ án tốt nghiệp tại FPT University. Hệ thống quản lý nội dung nhóm phát triển theo mô hình Agile, sử dụng JavaScript fullstack.',
      en: 'Capstone project at FPT University. A team content management system built following Agile methodology using JavaScript fullstack.'
    },
    tech: ['JavaScript', 'ReactJS', 'Agile/Scrum'],
    github: 'https://github.com/thanhht3001',
    featured: true
  },
  {
    id: 'personal-blog',
    title: {
      vi: 'Blog Cá nhân — thanhht.org',
      en: 'Personal Blog — thanhht.org'
    },
    description: {
      vi: 'Blog cá nhân developer style, xây dựng bằng React + Vite. Song ngữ Việt/Anh, dark theme với terminal typing effect.',
      en: 'Developer-style personal blog built with React + Vite. Bilingual Vi/En, dark theme with terminal typing effect.'
    },
    tech: ['React', 'Vite', 'i18next', 'CSS'],
    github: 'https://github.com/thanhht3001',
    featured: false
  }
]
