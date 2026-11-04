
import "./globals.css";

export const metadata = {
  title: "Task Manager | Frontend Assessment",
  description: "A simple task management application built with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
