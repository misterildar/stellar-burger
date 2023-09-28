export function colorStatus(orderData: any) {
  if (orderData?.status === 'done') {
    return { text: 'Выполнен', statusColor: '#00CCCC' };
  }

  if (orderData === 'created') {
    return { text: 'Создается', statusColor: '#F2F2F3' };
  }

  return { text: 'В ожидании', statusColor: '#F2F2F3' };
}
