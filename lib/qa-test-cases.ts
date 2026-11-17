export type QaTestCase = {
  id: string
  suiteId: string
  title: string
  tags: string[]
  durationSeconds: number
  failureMessage?: string
  failureType?: string
}

export type QaTestCaseResult = QaTestCase & {
  status: 'Passed' | 'Failed'
  executionSeconds: number
}

const qaTestCases: QaTestCase[] = [
  { id: 'TC-101', suiteId: 'portal-web', title: 'Inicio de sesión con credenciales válidas', tags: ['@smoke', '@critical', '@regression'], durationSeconds: 38 },
  { id: 'TC-102', suiteId: 'portal-web', title: 'Bloqueo de acceso tras intentos fallidos', tags: ['@smoke', '@regression'], durationSeconds: 42 },
  { id: 'TC-103', suiteId: 'portal-web', title: 'Consulta de saldo y movimientos recientes', tags: ['@smoke', '@regression'], durationSeconds: 46 },
  { id: 'TC-104', suiteId: 'portal-web', title: 'Transferencia a terceros refleja el saldo actualizado', tags: ['@critical', '@regression'], durationSeconds: 74, failureMessage: 'El saldo disponible no se actualizó al confirmar la transferencia.', failureType: 'AssertionError' },
  { id: 'TC-105', suiteId: 'portal-web', title: 'Descarga del comprobante de transferencia', tags: ['@regression'], durationSeconds: 52 },
  { id: 'TC-106', suiteId: 'portal-web', title: 'Recuperación de acceso mediante correo', tags: ['@regression'], durationSeconds: 48 },
  { id: 'TC-201', suiteId: 'api-pagos', title: 'Autorizar pago con token vigente', tags: ['@smoke', '@critical', '@regression'], durationSeconds: 15 },
  { id: 'TC-202', suiteId: 'api-pagos', title: 'Rechazar pago con saldo insuficiente', tags: ['@critical', '@regression'], durationSeconds: 19 },
  { id: 'TC-203', suiteId: 'api-pagos', title: 'Evitar duplicidad con clave idempotente', tags: ['@critical', '@regression'], durationSeconds: 23 },
  { id: 'TC-204', suiteId: 'api-pagos', title: 'Reversar pago y reconciliar movimiento', tags: ['@regression'], durationSeconds: 20 },
  { id: 'TC-205', suiteId: 'api-pagos', title: 'Validar contrato de respuesta del servicio', tags: ['@smoke', '@regression'], durationSeconds: 11 },
  { id: 'TC-301', suiteId: 'appian-flows', title: 'Crear solicitud de crédito con expediente completo', tags: ['@smoke', '@critical'], durationSeconds: 228 },
  { id: 'TC-302', suiteId: 'appian-flows', title: 'Adjuntar documentos y validar el expediente', tags: ['@critical', '@regression'], durationSeconds: 185 },
  { id: 'TC-303', suiteId: 'appian-flows', title: 'Aprobar solicitud según la matriz de riesgo', tags: ['@critical', '@regression'], durationSeconds: 230, failureMessage: 'La tarea de aprobación quedó en la bandeja general en lugar de asignarse al supervisor de riesgo.', failureType: 'WorkflowAssertionError' },
  { id: 'TC-304', suiteId: 'appian-flows', title: 'Escalar tarea vencida al supervisor', tags: ['@regression'], durationSeconds: 190 },
  { id: 'TC-305', suiteId: 'appian-flows', title: 'Cerrar caso y notificar al cliente', tags: ['@critical', '@regression'], durationSeconds: 210 },
  { id: 'TC-401', suiteId: 'checkout-load', title: 'Validar latencia base del checkout', tags: ['@performance', '@smoke'], durationSeconds: 210 },
  { id: 'TC-402', suiteId: 'checkout-load', title: 'Procesar 250 usuarios concurrentes', tags: ['@performance', '@regression'], durationSeconds: 280 },
  { id: 'TC-403', suiteId: 'checkout-load', title: 'Mantener percentil 95 bajo 600 ms', tags: ['@performance', '@critical'], durationSeconds: 300 },
  { id: 'TC-404', suiteId: 'checkout-load', title: 'Sostener el throughput de pagos digitales', tags: ['@performance', '@regression'], durationSeconds: 240 },
  { id: 'TC-501', suiteId: 'mobile-banking', title: 'Ingresar con autenticación biométrica', tags: ['@smoke', '@critical'], durationSeconds: 47 },
  { id: 'TC-502', suiteId: 'mobile-banking', title: 'Consultar saldo y movimientos de cuenta', tags: ['@smoke', '@regression'], durationSeconds: 41 },
  { id: 'TC-503', suiteId: 'mobile-banking', title: 'Confirmar transferencia desde vista previa', tags: ['@critical', '@regression'], durationSeconds: 68 },
  { id: 'TC-504', suiteId: 'mobile-banking', title: 'Cerrar sesión al expirar el token', tags: ['@regression'], durationSeconds: 35 },
  { id: 'TC-601', suiteId: 'api-onboarding', title: 'Registrar cliente con identidad verificada', tags: ['@smoke', '@critical'], durationSeconds: 18 },
  { id: 'TC-602', suiteId: 'api-onboarding', title: 'Rechazar documento de identidad duplicado', tags: ['@critical', '@regression'], durationSeconds: 16 },
  { id: 'TC-603', suiteId: 'api-onboarding', title: 'Generar registro de auditoría del alta', tags: ['@regression'], durationSeconds: 12 },
  { id: 'TC-604', suiteId: 'api-onboarding', title: 'Rechazar token OAuth expirado', tags: ['@smoke', '@regression'], durationSeconds: 10 },
]

const failedCaseIdsByRun: Record<string, string[]> = {
  'QA-1046': ['TC-303'],
}

export function getSuiteCases(suiteId: string) {
  return qaTestCases.filter((testCase) => testCase.suiteId === suiteId)
}

export function getExecutionCaseResults(run: { id: string; suiteId: string; suiteTag: string }): QaTestCaseResult[] {
  const failedCaseIds = failedCaseIdsByRun[run.id] ?? []

  return getSuiteCases(run.suiteId)
    .filter((testCase) => run.suiteTag === 'Todas' || testCase.tags.includes(run.suiteTag))
    .map((testCase, index) => ({
      ...testCase,
      status: failedCaseIds.includes(testCase.id) ? 'Failed' : 'Passed',
      executionSeconds: testCase.durationSeconds + ((index + 1) % 4) * 5,
    }))
}

export function formatCaseDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return minutes > 0 ? `${minutes}m ${String(remainder).padStart(2, '0')}s` : `${seconds}s`
}
