import { useState } from "react";
import { Input } from "@/components/custom/Input";
import { Link } from "react-router-dom";
import { Undo2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/custom/Select";
import { Button } from "@/components/custom/Button";

const AddClaims = () => {
  const [formData, setFormData] = useState({
    claimType: "",
    date: "",
    files: [] as File[],
    description: "",
    contact: "",
    amount: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, files: Array.from(e.target.files) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Add Claims</h1>
          <p className="text-muted-foreground">
            Fill in the details to submit your expense claim
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="enterprise" className="gap-2">
            <Link to="/claims">Back</Link>
            <Link to="/claims"><Undo2 /></Link>
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-6 max-w-xl"
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium">Claim Type</label>
          <Select
            value={formData.claimType}
            onValueChange={(val) =>
              setFormData({ ...formData, claimType: val })
            }
            placeholder="Select a Claim Type"
            className="w-[250px]"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Claim Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Medical">Medical</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Date of Expense</label>
          <Input
            type="date"
            className="text-white w-[250px]"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Upload Bills</label>
          <Input
            type="file"
            multiple
            className="w-[300px]"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Description / Comments</label>
          <textarea
            name="description"
            cols={50}
            rows={4}
            className="bg-transparent outline-none text-white border border-gray-500 rounded-md p-2"
            placeholder="Provide additional details about the claim"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Contact Information</label>
          <Input
            type="text"
            className="text-white w-[300px]"
            placeholder="Enter your email or phone"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Amount</label>
          <Input
            type="number"
            className="text-white w-[200px]"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </div>

        <div>
          <Button type="submit" className="mt-4">
            Submit Claim
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddClaims;
