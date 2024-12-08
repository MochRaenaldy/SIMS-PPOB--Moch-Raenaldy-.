import Dashboard from "@/components/Card/Dashboard";
import HistoryTransaction from "./HistoryTransaction";
import Navbar from "@/components/Card/Navbar";
import Card from "@/components/Card";

const TransactionPage = () => {
  return (
    <div>
      <Card>
        <HistoryTransaction />
      </Card>
    </div>
  );
};

export default TransactionPage;
