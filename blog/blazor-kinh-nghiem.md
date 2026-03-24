---
title: "Kinh nghiệm làm việc với Blazor trong dự án thực tế"
date: "2026-03-15"
excerpt: "Những bài học mình rút ra sau hơn 1 năm làm việc với Blazor trong phần mềm y tế."
tags: ["blazor", ".net", "healthcare"]
---

## Blazor trong thực tế

Sau hơn 1 năm làm việc với Blazor trong các dự án phần mềm y tế, mình muốn chia sẻ một số kinh nghiệm thực tế.

## Tại sao chọn Blazor?

Với team .NET, Blazor là lựa chọn tự nhiên:

- **Một ngôn ngữ** — C# cho cả frontend và backend
- **Component-based** — Tương tự React nhưng dùng C#
- **Tích hợp tốt** — Với hệ sinh thái .NET

## Những bài học thực tế

### 1. State Management

Trong ứng dụng lớn, quản lý state là thách thức. Mình sử dụng pattern đơn giản:

```csharp
public class AppState
{
    public event Action OnChange;

    private string _currentUser;
    public string CurrentUser
    {
        get => _currentUser;
        set { _currentUser = value; OnChange?.Invoke(); }
    }
}
```

### 2. Performance với dữ liệu lớn

Khi xử lý hàng triệu records, virtualization là bạn:

```html
<Virtualize Items="@patients" Context="patient">
    <PatientRow Patient="@patient" />
</Virtualize>
```

### 3. Xử lý form phức tạp

Healthcare có rất nhiều form phức tạp. `EditForm` + `DataAnnotations` giúp validate dễ dàng.

## Kết luận

Blazor là công nghệ tuyệt vời cho team .NET. Không hoàn hảo, nhưng đáng để đầu tư học.
