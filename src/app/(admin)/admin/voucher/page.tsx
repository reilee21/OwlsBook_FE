"use client";
import { LoadingModal } from "@/components/shared/LoadingModal";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import AddVoucher from "@/components/voucher/voucherAdd";
import EditVoucher from "@/components/voucher/voucherEdit";
import VoucherTable from "@/components/voucher/voucherTable";
import { useGetAllVoucherQuery } from "@/services/voucher/voucherApi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
export default function VoucherPage() {
  const router = useRouter();
  const role = useSelector((state)=>state.auth.role)
  useEffect(()=>{
    if(role) {
      if(role!=='admin'){
        router.push("/");
        return;
      } 
    }
  },[role])
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [vouchers, setVouchers] = useState([]);
  const [editModal, setEditmodal] = useState(false);
  const [editVC, setEditVC] = useState(null);

  const { data, refetch,isLoading } = useGetAllVoucherQuery({
    page: page,
    pageSize: pageSize,
  });
  useEffect(() => {
    if (data) {
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
      setVouchers(data.items);
    }
  }, [data]);
  const changepage = (page) => setPage(page);
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const setEDVC = (voucher) => {
    setEditVC(voucher);
    setEditmodal(true);
  };
  if(isLoading) return(
    <LoadingModal message={"Vui lòng chờ trong giây lát"}/>
  )
  return (
    <div className=" mt-4">
      <div className="rounded-t mb-0 py-3 border-0 bg-white">
        <div className="flex flex-wrap items-center">
          <div className=" w-full px-4 max-w-full flex flex-row">
            <h3 className="font-semibold text-lg w-full">Mã giảm giá</h3>
            <AddVoucher updated={refetch} />
          </div>
        </div>
      </div>
      <VoucherTable vouchers={vouchers} setEditVC={setEDVC} />
      <div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <Button onClick={handlePreviousPage} disabled={page === 1}>
            Trước
          </Button>
          <Pagination
            currentPage={page}
            pageSize={pageSize}
            totalItems={totalItems}
            paginate={changepage}
          />
          <Button onClick={handleNextPage} disabled={page === totalPages}>
            Sau
          </Button>
        </div>
      </div>

      <EditVoucher
        voucher={editVC}
        isOpen={editModal}
        onClose={() => {
          setEditmodal(false);
          setEditVC(null);
        }}
        update={refetch}
      />
    </div>
  );
}
