export function handleOrderStatus(status: number) {
  switch (status) {
    case 1:
      return ['processing', '待支付'];
    case 2:
      return ['error', '已取消'];
    case 3:
      return ['success', '已生效'];
    case 4:
      return ['default', '已完成'];
    default:
      return ['default', ''];
  }
}

export function orderStatus() {
  return [
    {
      value: 1,
      label: '待支付',
    },
    {
      value: 2,
      label: '已取消',
    },
    {
      value: 3,
      label: '已生效',
    },
    {
      value: 4,
      label: '已完成',
    },
  ];
}

export function orderPaymentStatus() {
  return [
    {
      value: 1,
      label: '已创建',
    },
    {
      value: 2,
      label: '已完成',
    },
    {
      value: 3,
      label: '失败/过期',
    },
    {
      value: 4,
      label: '过期后收到款项',
    },
    {
      value: 5,
      label: '正在确认',
    },
    {
      value: 6,
      label: '需手动确认',
    },
    {
      value: 7,
      label: '待确认',
    },
    {
      value: 8,
      label: '少付',
    },
  ];
}

export function handleProductStatus(status: number) {
  switch (status) {
    case 1:
      return ['processing', '草稿'];
    case 2:
      return ['success', '上线'];
    case 3:
      return ['error', '下线'];
    case 4:
      return ['success', '上线推荐'];
    default:
      return;
  }
}

export function handleProductType(type: number) {
  switch (type) {
    case 1:
      return '供应商首发';
    default:
      return '';
  }
}

export function handleHashrateType(type: number) {
  switch (type) {
    case 1:
      return '全产出';
    case 2:
      return '加速回本';
    default:
      return '';
  }
}

export function handleLang(lang: string) {
  switch (lang) {
    case 'zh':
      return '简体中文';
    case 'en':
      return 'English';
    default:
      return;
  }
}

export function unitOptions() {
  return [
    {
      value: 'H/s',
      label: 'H/s',
    },
    {
      value: 'KH/s',
      label: 'KH/s',
    },
    {
      value: 'MH/s',
      label: 'MH/s',
    },
    {
      value: 'GH/s',
      label: 'GH/s',
    },
    {
      value: 'TH/s',
      label: 'TH/s',
    },
    {
      value: 'PH/s',
      label: 'PH/s',
    },
  ];
}

export function statusOptions() {
  return [
    {
      value: 1,
      label: '草稿',
    },
    {
      value: 2,
      label: '上线',
    },
    {
      value: 3,
      label: '下线',
    },
    {
      value: 4,
      label: '上线推荐',
    },
  ];
}

export function typeOptions() {
  return [
    {
      value: 1,
      label: '供应商首发',
    },
  ];
}

export function hashTypeOptions() {
  return [
    {
      value: 1,
      label: '全产出',
    },
    {
      value: 2,
      label: '加速回本',
    },
  ];
}

export function handlePayType(type: number) {
  switch (type) {
    case 1:
      return '算力订单';
    case 2:
      return '电费订单';
    default:
      return '';
  }
}

export function hashrateStatus() {
  return [
    {
      value: 1,
      label: '未生效',
    },
    {
      value: 2,
      label: '已生效',
    },
    {
      value: 3,
      label: '已结束',
    },
    {
      value: 4,
      label: '已欠费',
    },
  ];
}

export function hashrateUnitsOptions() {
  return [
    {
      value: 'H/s',
      label: 'H/s',
    },
    {
      value: 'KH/s',
      label: 'KH/s',
    },
    {
      value: 'MH/s',
      label: 'MH/s',
    },
    {
      value: 'GH/s',
      label: 'GH/s',
    },
    {
      value: 'TH/s',
      label: 'TH/s',
    },
    {
      value: 'PH/s',
      label: 'PH/s',
    },
    {
      value: 'EH/s',
      label: 'EH/s',
    },
    {
      value: 'ZH/s',
      label: 'ZH/s',
    },
    {
      value: 'YH/s',
      label: 'YH/s',
    },
  ];
}

export function handleMinerHashrate(value: any, unit: string) {
  if (unit === 'H/s') {
    return value;
  } else if (unit === 'KH/s') {
    return value * 1000;
  } else if (unit === 'MH/s') {
    return value * 1000000;
  } else if (unit === 'GH/s') {
    return value * 1000000000;
  } else if (unit === 'TH/s') {
    return value * 1000000000000;
  } else if (unit === 'PH/s') {
    return value * 1000000000000000;
  } else if (unit === 'EH/s') {
    return value * 1000000000000000000;
  } else if (unit === 'ZH/s') {
    return value * 1000000000000000000000;
  } else if (unit === 'YH/s') {
    return value * 1000000000000000000000000;
  }
}

export function hashrateConversion(value: any) {
  if (value < 1000) {
    value = value / 1;
    return [value.toFixed(2), 'H/s'];
  } else if (value < 1000000) {
    value = value / 1000;
    return [value.toFixed(2), 'KH/s'];
  } else if (value < 1000000000) {
    value = value / 1000000;
    return [value.toFixed(2), 'MH/s'];
  } else if (value < 1000000000000) {
    value = value / 1000000000;
    return [value.toFixed(2), 'GH/s'];
  } else if (value < 1000000000000000) {
    value = value / 1000000000000;
    return [value.toFixed(2), 'TH/s'];
  } else if (value < 1000000000000000000) {
    value = value / 1000000000000000;
    return [value.toFixed(2), 'PH/s'];
  } else if (value < 1000000000000000000000) {
    value = value / 1000000000000000000;
    return [value.toFixed(2), 'EH/s'];
  } else if (value < 1000000000000000000000000) {
    value = value / 1000000000000000000000;
    return [value.toFixed(2), 'ZH/s'];
  } else if (value < 1000000000000000000000000000) {
    value = value / 1000000000000000000000000;
    return [value.toFixed(2), 'YH/s'];
  } else {
    return ['0.00', 'H'];
  }
}

export function announcementStatusOptions() {
  return [
    {
      value: 1,
      label: '草稿',
    },
    {
      value: 2,
      label: '上线',
    },
    {
      value: 3,
      label: '下线',
    },
  ];
}

export function handleLanguage(lang: string) {
  switch (lang) {
    case 'zh_CN':
      return '简体中文';
    case 'en_US':
      return 'English';
    default:
      return 'English';
  }
}

export function handleAnnouncementStatus(status: number) {
  switch (status) {
    case 1:
      return ['processing', '草稿'];
    case 2:
      return ['success', '上线'];
    case 3:
      return ['error', '下线'];
    default:
      return ['processing', '草稿'];
  }
}

export function handleHashrateStatus(status: number) {
  switch (status) {
    case 1:
      return ['warning', '未生效'];
    case 2:
      return ['success', '已生效'];
    case 3:
      return ['default', '已结束'];
    case 4:
      return ['error', '已欠费'];
    default:
      return ['default', '已结束'];
  }
}
