# Nexus ERP

A comprehensive Enterprise Resource Planning (ERP) system built with React, TypeScript, and Tailwind CSS.

## Features

- **CRM (Customer Relationship Management)**
  - Contact Management
  - Deal Tracking
  - Sales Pipeline with Kanban Board
  - Customer Interaction History

- **Employee Management**
  - Employee Directory
  - Attendance Tracking
  - Leave Management
  - Performance Reviews

- **Project Management**
  - Project List View
  - Gantt Chart Timeline
  - Task Management
  - Project Analytics

- **Social Media Management**
  - Post Scheduling
  - Campaign Management
  - Analytics Dashboard
  - Multi-platform Support

- **Finance Integration**
  - Xero Integration
  - Financial Dashboard
  - Transaction Tracking
  - Financial Reports

- **Additional Features**
  - Real-time Chat
  - Calendar Management
  - Task Management
  - Comprehensive Dashboard

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- Lucide React Icons
- Hello Pangea DnD (Drag and Drop)
- Axios

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nexus-erp.git
```

2. Install dependencies:
```bash
cd nexus-erp
npm install
```

3. Create a `.env` file in the root directory and add your Xero credentials:
```env
VITE_XERO_CLIENT_ID=your_client_id
VITE_XERO_CLIENT_SECRET=your_client_secret
VITE_XERO_REDIRECT_URI=http://localhost:5173/xero/callback
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── crm/
│   ├── employees/
│   ├── finance/
│   ├── projects/
│   └── social/
├── hooks/
├── lib/
├── App.tsx
└── main.tsx
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Lucide Icons](https://lucide.dev/)
- [Hello Pangea DnD](https://github.com/hello-pangea/dnd)