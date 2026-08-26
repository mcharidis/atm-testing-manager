export interface KalTicketData {
  customerBank: string;
  atmModel: string;
  osVersion: string;
  severity: string;
  slaTime: string;
  environment: string;
  platformVersion: string;
  softwareInfo: string;
  tracePath: string;
  hybridMode: string;
  browserEngine: string;
  uiFramework: string;
  engineer: string;
  issueDescription: string;
  timestamp: string;
  analysis: string;
}

export const initialTicketData: KalTicketData = {
  customerBank: '',
  atmModel: '',
  osVersion: '',
  severity: '3 - Minor',
  slaTime: '',
  environment: '',
  platformVersion: '',
  softwareInfo: '',
  tracePath: '',
  hybridMode: 'No',
  browserEngine: 'Edge',
  uiFramework: 'React',
  engineer: '',
  issueDescription: '',
  timestamp: '',
  analysis: 'Scenario Tested: \n\nExpected Behavior: \n\nObserved Behavior: \n',
};
