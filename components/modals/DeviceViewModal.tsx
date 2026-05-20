// //components/modals/DeviceViewModal.tsx


"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { AssignedDevice } from "@/models/AssignedDevice";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    device: AssignedDevice | null;
}

export default function DeviceViewModal({
    open,
    onOpenChange,
    device,
}: Props) {
    return (
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />

                <DialogPrimitive.Content className="fixed top-1/2 left-1/2 w-[800px] max-w-[95%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl overflow-hidden">

                    {/* HEADER */}
                    <div className="border-b p-5 bg-muted">
                        <DialogPrimitive.Title className="text-lg font-semibold">
                            Device Details
                        </DialogPrimitive.Title>

                        <p className="text-sm text-muted-foreground">
                            Reference: {device?.referenceNumber || "-"}
                        </p>
                    </div>

                    {/* BODY */}
                    {device && (
                        <div className="p-6 space-y-5 text-sm">

                            {/* Employee Info */}
                            <div>
                                <h3 className="font-semibold mb-3">Employee Information</h3>

                                <div className="grid grid-cols-2 gap-3 bg-muted p-4 rounded-lg">
                                    <Info label="Name" value={device.employeeName} />
                                    <Info label="ID" value={device.employeeId} />
                                    <Info label="Department" value={device.department} />
                                    <Info label="Designation" value={device.designation} />
                                </div>
                            </div>

                            {/* Device Info */}
                            <div>
                                <h3 className="font-semibold mb-3">Device Information</h3>

                                <div className="grid grid-cols-2 gap-3 bg-muted p-4 rounded-lg">
                                    <Info label="Category" value={device.category} />
                                    <Info label="Model" value={device.model} />
                                    <Info label="Device SL" value={device.deviceSl} />
                                    <Info label="Vendor" value={device.vendor} />
                                    <Info label="Type" value={device.deviceType} />
                                    <Info label="Status" value={device.status} />
                                    <Info label="Condition" value={device.condition} />
                                    <Info label="Remarks" value={device.remarks} />
                                </div>
                            </div>

                            {/* Timeline */}
                            <div>
                                <h3 className="font-semibold mb-3">Timeline</h3>

                                <div className="grid grid-cols-2 gap-3 bg-muted p-4 rounded-lg">
                                    <Info label="Assigned Date" value={device.assignedDate} />
                                    <Info label="Purchase Date" value={device.purchaseDate} />
                                </div>
                            </div>

                        </div>
                    )}

                    {/* FOOTER */}
                    <div className="p-5 border-t flex justify-end">
                        <Button onClick={() => onOpenChange(false)}>
                            Close
                        </Button>
                    </div>

                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}

function Info({ label, value }: { label: string; value?: string }) {
    return (
        <div>
            <p className="text-muted-foreground text-xs">{label}</p>
            <p className="font-medium">{value || "-"}</p>
        </div>
    );
}