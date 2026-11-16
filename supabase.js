// ── Supabase Client ───────────────────────────────────────────────────
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL  = 'https://nqhhtosbaneynohkzrnq.supabase.co';
const SUPABASE_KEY  = 'sb_publishable_ye41xi31ic0771AmJ60tvQ_XYd0X_o9';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false
  }
});

// ── Products ──────────────────────────────────────────────────────────

export async function getInventory() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) { console.error('getInventory:', error.message); return []; }
  return data;
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  if (error) { console.error('getProductById:', error.message); return null; }
  return data;
}

export async function insertProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(productId) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);
  if (error) throw error;
}

export async function updateProductSizes(productId, sizes) {
  const { error } = await supabase
    .from('products')
    .update({ sizes })
    .eq('id', productId);
  if (error) throw error;
}

// ── Storage ───────────────────────────────────────────────────────────

export async function uploadProductImage(file, productName) {
  const ext      = file.name.split('.').pop();
  const filename = `${Date.now()}-${productName.replace(/\s+/g, '-').toLowerCase()}.${ext}`;

  const { error } = await supabase.storage
    .from('product-images')
    .upload(filename, file, { cacheControl: '3600', upsert: true });

  if (error) throw error;

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filename);

  return data.publicUrl;
}

// ── Orders ────────────────────────────────────────────────────────────

export async function saveOrder(order) {
  const id = 'ORD-' + Date.now();
  const payload = {
    ...order,
    id,
    status: 'Pending',
    paystack_ref: order.paystack_ref || null
  };
  const { error } = await supabase.from('orders').insert([payload]);
  if (error) throw error;
  return id;
}

export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('getOrders:', error.message); return []; }
  return data;
}

export async function updateOrderStatus(orderId, status) {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);
  if (error) throw error;
}

// ── Auth ──────────────────────────────────────────────────────────────

export async function adminSignIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  console.log('Signed in as:', data.user?.email, '| Session:', !!data.session);
  return data.session;
}

export async function adminSignOut() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}
