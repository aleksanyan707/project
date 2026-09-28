import {
  CheckCircle2,
  Clock3,
  FileText,
  UserRoundSearch,
  XCircle,
} from "lucide-react";

import "./Statistics.css";

const Statistics = ({ applications }) => {
  const statistics = [
    {
      title: "Total",
      value: applications.length,
      icon: FileText,
      className: "total",
    },
    {
      title: "Pending",
      value: applications.filter(
        (application) => application.status === "pending",
      ).length,
      icon: Clock3,
      className: "pending",
    },
    {
      title: "Interview",
      value: applications.filter(
        (application) => application.status === "interview",
      ).length,
      icon: UserRoundSearch,
      className: "interview",
    },
    {
      title: "Accepted",
      value: applications.filter(
        (application) => application.status === "accepted",
      ).length,
      icon: CheckCircle2,
      className: "accepted",
    },
    {
      title: "Rejected",
      value: applications.filter(
        (application) => application.status === "rejected",
      ).length,
      icon: XCircle,
      className: "rejected",
    },
  ];

  return (
    <section className="statistics">
      {statistics.map((item) => {
        const Icon = item.icon;

        return (
          <article
            className={`statistic-card statistic-card--${item.className}`}
            key={item.title}
          >
            <div className="statistic-card__icon">
              <Icon size={22} />
            </div>

            <div>
              <strong>{item.value}</strong>
              <p>{item.title}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Statistics;
