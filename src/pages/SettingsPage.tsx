import { useState, useEffect } from 'react';
import { Upload, Save, Image as ImageIcon, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

function SettingsPage() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    loadLogo();
  }, []);

  const loadLogo = async () => {
    if (!supabase) return;

    try {
      const { data } = await supabase
        .from('settings')
        .select('logo_url')
        .single();

      if (data?.logo_url) {
        setLogoUrl(data.logo_url);
      }
    } catch (error) {
      console.log('No logo found yet');
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select an image file' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'File size must be less than 5MB' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    await uploadLogo(file);
  };

  const uploadLogo = async (file: File) => {
    if (!supabase) {
      setMessage({ type: 'error', text: 'Database not configured' });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      const { error: dbError } = await supabase
        .from('settings')
        .upsert(
          { id: 1, logo_url: publicUrl },
          { onConflict: 'id' }
        );

      if (dbError) throw dbError;

      setLogoUrl(publicUrl);
      setMessage({ type: 'success', text: 'Logo uploaded successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to upload logo' });
    } finally {
      setUploading(false);
    }
  };

  const removeLogo = async () => {
    if (!supabase) {
      setMessage({ type: 'error', text: 'Database not configured' });
      return;
    }

    try {
      await supabase
        .from('settings')
        .update({ logo_url: null })
        .eq('id', 1);

      setLogoUrl(null);
      setPreviewUrl(null);
      setMessage({ type: 'success', text: 'Logo removed successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Failed to remove logo' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4">
              Site
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {' '}Settings
              </span>
            </h1>
            <p className="text-xl text-slate-600">
              Manage your website logo and branding
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-3">
                  <ImageIcon className="text-blue-600" size={28} />
                  <span>Website Logo</span>
                </h2>

                {message && (
                  <div className={`mb-6 p-4 rounded-xl ${
                    message.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {message.text}
                  </div>
                )}

                <div className="flex flex-col items-center space-y-6">
                  {(logoUrl || previewUrl) && (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative bg-slate-50 rounded-2xl p-8 border-2 border-slate-200">
                        <img
                          src={previewUrl || logoUrl || ''}
                          alt="Logo"
                          className="max-h-48 max-w-full object-contain"
                        />
                      </div>
                      <button
                        onClick={removeLogo}
                        className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}

                  {!logoUrl && !previewUrl && (
                    <div className="w-full max-w-md bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center">
                      <ImageIcon className="mx-auto text-slate-400 mb-4" size={48} />
                      <p className="text-slate-600 text-lg">No logo uploaded yet</p>
                    </div>
                  )}

                  <div className="w-full max-w-md">
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        disabled={uploading}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className={`flex items-center justify-center space-x-3 w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                          uploading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'
                        }`}
                      >
                        {uploading ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload size={24} />
                            <span>{logoUrl ? 'Change Logo' : 'Upload Logo'}</span>
                          </>
                        )}
                      </label>
                    </label>

                    <p className="text-sm text-slate-500 mt-4 text-center">
                      Recommended: PNG or SVG, max 5MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-8">
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="font-bold text-blue-900 mb-2">Tips for best results:</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Use a transparent background (PNG format)</li>
                    <li>• Keep dimensions between 200-500px wide</li>
                    <li>• Use high-quality images for sharp display</li>
                    <li>• Logo will appear in the header and home page</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SettingsPage;
