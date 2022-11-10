import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef: any = createNavigationContainerRef();

export function navigate(name: any, params?: any) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

export function goBack() {
    if (navigationRef.isReady()) {
        navigationRef.goBack();
    }
}

export function reset(name: any, params?: any) {
    if (navigationRef.isReady()) {
        navigationRef.reset({
            routes: [{ name: name }, { params }],
        });
    }
}
