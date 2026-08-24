import axios from "axios";

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

app.interceptors.request.use(
  (res) => res,
  (err) => Promise.reject(err),
);

// متغیرهایی برای مدیریت ریکوئست‌های همزمان هنگام رفرش توکن
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

app.interceptors.response.use(
  // با این خط، دیگر نیازی نیست در سرویس‌ها بنویسیم: .then(({ data }) => data.data)
  (res) => res.data.data,
  async (err) => {
    const originalConfig = err.config;

    if (err.response?.status === 401 && !originalConfig._retry) {
      if (isRefreshing) {
        // اگر توکن در حال رفرش شدن است، بقیه ریکوئست‌ها را در صف نگه می‌داریم
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => app(originalConfig))
          .catch((err) => Promise.reject(err));
      }

      originalConfig._retry = true;
      isRefreshing = true;

      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh-token`,
          {
            withCredentials: true,
          },
        );

        processQueue(null);
        return app(originalConfig);
      } catch (error) {
        processQueue(error);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  },
);

const http = {
  get: app.get,
  patch: app.patch,
  put: app.put,
  delete: app.delete,
  post: app.post,
};

export default http;
