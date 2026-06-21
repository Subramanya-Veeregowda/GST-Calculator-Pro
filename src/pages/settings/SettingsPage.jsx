import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ProfileService } from '../../core/services/profile.service';
import { Building2, User, FileText, Phone, Mail, MapPin } from 'lucide-react';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    businessName: '', ownerName: '', gstin: '', phone: '', email: '', address: ''
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setProfile(ProfileService.getProfile());
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    ProfileService.saveProfile(profile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-[768px] mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Settings</h1>
        <p className="text-text-secondary text-sm">
          Manage your business profile. This information will automatically populate on your invoices.
          All data is saved locally on your device.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Business Name"
              name="businessName"
              value={profile.businessName}
              onChange={handleChange}
              placeholder="Acme Corp"
              icon={Building2}
            />
            <Input
              label="Owner Name"
              name="ownerName"
              value={profile.ownerName}
              onChange={handleChange}
              placeholder="John Doe"
              icon={User}
            />
            <Input
              label="GSTIN"
              name="gstin"
              value={profile.gstin}
              onChange={handleChange}
              placeholder="29XXXXX0000X1Z5"
              icon={FileText}
            />
            <Input
              label="Phone Number"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              icon={Phone}
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="hello@acme.com"
              icon={Mail}
              className="md:col-span-2"
            />
            <div className="md:col-span-2">
              <label className="text-[13px] font-medium text-text-muted mb-1.5 block">Business Address</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-text-muted" />
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  placeholder="123 Business Street, City, State, PIN"
                  className="w-full bg-bg-elevated border border-border text-text-primary text-[15px] rounded-[10px] pl-10 pr-4 py-3 min-h-[100px] resize-y focus:border-primary focus:ring-3 focus:ring-primary/12 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-end gap-4">
            {isSaved && <span className="text-success text-sm font-medium">Saved successfully!</span>}
            <Button type="submit">
              Save Profile
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
